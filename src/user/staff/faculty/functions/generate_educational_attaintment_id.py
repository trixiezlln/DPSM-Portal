import random, string

def generate_educational_attainment_id():
    id = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(8))
    print(id)
    return 'ea'+id