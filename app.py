from flask import Flask, render_template, request, redirect, session, jsonify
import oracledb, requests
from config import OPENWEATHER_API_KEY, ORACLE_USER, ORACLE_PASSWORD, ORACLE_DSN

app = Flask(__name__)
app.secret_key = "supersecret"

def get_conn():
    return oracledb.connect(user=ORACLE_USER, password=ORACLE_PASSWORD, dsn=ORACLE_DSN)

@app.route("/")
def index():
    # If user is logged in, redirect to dashboard
    if "user" in session:
        return redirect("/dashboard")
    # If admin is logged in, redirect to admin panel
    elif "admin" in session:
        return redirect("/admin")
    # Otherwise, show login page
    return render_template("user/index.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        password = request.form["password"]
        city = request.form["city"]
        state = request.form["state"]

        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute("INSERT INTO users (user_name,email_id,password,city,state) VALUES (:1,:2,:3,:4,:5)",
                        (name, email, password, city, state))
            conn.commit()
        except Exception as e:
            return f"Error: {e}"
        finally:
            cur.close()
            conn.close()
        return redirect("/")
    return render_template("user/signup.html")

@app.route("/login", methods=["POST"])
def login():
    role = request.form["role"]
    email = request.form["email"]
    password = request.form["password"]

    # Admin Login (hardcoded)
    if role == "admin":
        if email == "k456@gmail.com" and password == "123456":
            session["admin"] = True
            return redirect("/admin")
        else:
            return "Invalid Admin Login"

    # User Login (from DB)
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT user_name FROM users WHERE email_id=:1 AND password=:2", (email, password))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if row:
        session["user"] = row[0]
        return redirect("/dashboard")
    return "Invalid User Login"

@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect("/")
    return render_template("user/dashboard.html", user=session["user"])

@app.route("/weather", methods=["POST"])
def weather():
    city = request.form.get("city")
    lat = request.form.get("lat")
    lon = request.form.get("lon")
    if lat and lon:
        url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    else:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    res = requests.get(url).json()
    return jsonify(res)


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/admin")
def admin():
    if "admin" not in session:
        return redirect("/")
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT user_name, email_id, city, state FROM users")
    rows = cur.fetchall()
    cur.execute("SELECT COUNT(*) FROM users")
    total_users = cur.fetchone()[0]
    cur.close()
    conn.close()
    return render_template("admin/admin.html", users=rows, total=total_users)

@app.route("/forecast", methods=["GET", "POST"])
def forecast():
    if "user" not in session:
        return redirect("/")
    return render_template("user/forecast.html", user=session["user"])


@app.route("/about")
def about():
    if "user" not in session:
        return redirect("/")
    return render_template("user/about.html", user=session["user"])

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if "user" not in session:
        return redirect("/")
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]
        # Save message to DB or send email here
        return f"Thank you {name}, we have received your message!"
    return render_template("user/contact.html", user=session["user"])


if __name__ == "__main__":
    app.run(debug=True)
