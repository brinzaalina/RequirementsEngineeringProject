import uuid
import random


# Helper function to generate a UUID
def generate_uuid():
    return str(uuid.uuid4())


# Function to generate a random name
def generate_name(type):
    if type == 'student':
        first_names = ["Andrei", "Alexandra", "Mihai", "Ioana", "Vlad", "Maria", "Dan", "Ana", "Ionut", "Elena"]
        last_names = ["Popescu", "Ionescu", "Nitu", "Dumitrescu", "Stan", "Dinu", "Vasile", "Moldovan", "Marin",
                      "Tudor"]
        return random.choice(first_names) + " " + random.choice(last_names)
    elif type == 'company':
        prefixes = ["Info", "Medi", "Engi", "Tour", "Fin"]
        suffixes = ["Tech", "Health", "Works", "Travel", "Capital"]
        return random.choice(prefixes) + random.choice(suffixes)


# Function to generate a field-specific company name
def generate_company_name(field):
    field_to_names = {
        "Computer Science": ["Data", "Net", "Code", "Tech", "Byte", "Cyber"],
        "Medicine": ["Medi", "Health", "Care", "Life", "Bio", "Well"],
        "Engineering": ["Engi", "Build", "Struct", "Mecha", "Innov", "Tech"],
        "Tourism": ["Travel", "Explore", "Journey", "Voyage", "Tour", "Destiny"],
        "Finance": ["Fin", "Capital", "Money", "Wealth", "Bank", "Econ"]
    }
    suffixes = ["Solutions", "Systems", "Group", "Technologies", "Services", "Enterprises"]
    return random.choice(field_to_names[field]) + random.choice(suffixes)


# Generating diverse company descriptions
def generate_company_description(name):
    descriptions = [
        f"At {name}, innovation meets excellence.",
        f"Join {name}, where ideas become reality.",
        f"{name}: Pioneering the future of technology.",
        f"Empowering progress at {name}.",
        f"{name}: Where creativity meets opportunity.",
        f"Leading the way in industry at {name}."
    ]
    return random.choice(descriptions)


# Generating companies
fields = ["Computer Science", "Medicine", "Engineering", "Tourism", "Finance"]
companies = [(generate_uuid(), generate_company_name(field), field) for field in fields for _ in
             range(8 // len(fields))]


# Function to generate a random email
def generate_email(name):
    domains = ["@gmail.com", "@hotmail.com", "@yahoo.com"]
    return name.lower().replace(" ", ".") + random.choice(domains)


# Generating field-specific internship descriptions
def generate_internship_description(field):
    descriptions = {
        "Computer Science": "Dive into cutting-edge technology and software development.",
        "Medicine": "Contribute to life-saving medical research and healthcare innovation.",
        "Engineering": "Work on groundbreaking engineering projects in a dynamic team.",
        "Tourism": "Explore the exciting world of travel and hospitality management.",
        "Finance": "Join the fast-paced world of financial analysis and investment."
    }
    return random.choice([descriptions[field], f"Exciting opportunity in {field}"])


# Generating companies
fields = ["Computer Science", "Medicine", "Engineering", "Tourism", "Finance"]
companies = [(generate_uuid(), generate_name('company'), field) for field in fields for _ in range(8 // len(fields))]

# Generating students
students = [(generate_uuid(), generate_name('student')) for _ in range(15)]

# Generating recruiters and internships
recruiters = []
internships = []
cities = ["Bucharest", "Cluj-Napoca", "Timisoara", "Iasi", "Brasov"]
for company_id, _, field in companies:
    num_recruiters = random.randint(1, 2)
    for _ in range(num_recruiters):
        recruiter_id = generate_uuid()
        recruiters.append((recruiter_id, company_id))

    for _ in range(4):
        internship_id = generate_uuid()
        description = generate_internship_description(field)
        location = random.choice(cities)
        internships.append((internship_id, description, field, location, random.randint(1, 5),
                            random.uniform(3000, 5000), f"{field} Internship", company_id))

# Generating users and linking them to students and recruiters
users = [(student_id,
          generate_email(name), name, "password123", "STUDENT") for student_id, name in students]
users += [
    (recruiter_id, generate_email("recruiter" + recruiter_id), "Recruiter " + recruiter_id, "password123", "RECRUITER")
    for recruiter_id, _ in recruiters]

# SQL Inserts
inserts = []

# Inserting companies
for company_id, name, _ in companies:
    description = generate_company_description(name)

    inserts.append(
        f"INSERT INTO company (company_id, company_details, company_name) VALUES ('{company_id}', '{description}', '{name}');")

# Inserting users
for user_id, email, name, password, role in users:
    inserts.append(
        f"INSERT INTO users (id, email, name, password, role) VALUES ('{user_id}', '{email}', '{name}', '{password}', '{role}');")

# Inserting students
for student_id, _ in students:
    university = random.choice(
        ["University of Bucharest", "Babes-Bolyai University", "Technical University of Cluj-Napoca",
         "University of Iasi", "Transilvania University of Brasov"])
    inserts.append(f"INSERT INTO student (id, university) VALUES ('{student_id}', '{university}');")

# Inserting recruiters
for recruiter_id, company_id in recruiters:
    inserts.append(f"INSERT INTO recruiter (id, company_id) VALUES ('{recruiter_id}', '{company_id}');")

# Inserting internships
for internship_id, description, field, location, positions, salary, title, company_id in internships:
    inserts.append(
        f"INSERT INTO internship (internship_id, description, field, location, positions, salary, title, company_id) VALUES ('{internship_id}', '{description}', '{field}', '{location}', {positions}, {salary}, '{title}', '{company_id}');")

# Printing the insert statements
for insert in inserts:
    print(insert)
