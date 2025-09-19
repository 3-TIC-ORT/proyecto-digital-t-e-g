import json
fichas = {
    "Argentina": 5,
    "Brasil": 3,
    "Chile": 2
}
def guardar_fichas(fichas, archivo="fichas.json"):
    with open(archivo, "w") as f:
        json.dump(fichas, f, indent=4)
    print("Fichas guardadas en", archivo)
def cargar_fichas(archivo="fichas.json"):
    try:
        with open(archivo, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print("No hay archivo guardado todavía.")
        return {}
guardar_fichas(fichas)
fichas_cargadas = cargar_fichas()
print("Fichas cargadas:", fichas_cargadas)
