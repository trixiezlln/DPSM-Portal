import random, string

def generate_id(header):
    id = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    print(id)
    return header+id

# def generate_work_experience_id():
#     id = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
#     print(id)
#     return 'we'+id

# def generate_licensure_exam_id():
#     id = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
#     print(id)
#     return 'le'+id

# def generate_training_id():
#     id = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
#     print(id)
#     return 'ts'+id

# def generate_fsr_set_id():
#     id = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
#     print(id)
#     return 'fsr'+id