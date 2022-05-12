import random, string

def generate_work_experience_id():
    id = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    print(id)
    return 'we'+id