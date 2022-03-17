import random, string

def generate_educational_attainment_id():
    id = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    print(id)
    return 'ea'+id