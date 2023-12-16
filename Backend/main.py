import pyodbc

from Models.Player import Player
from Controllers.PlayerController import PlayerController

def main():

    connection = pyodbc.connect("Driver={SQL Server};Server=localhost;Database=DartsApp;Integrated Security=True")
   
    # Maak een PlayerController instantie
    player_controller = PlayerController()

    # Voeg een nieuwe speler toe
    #new_player = Player(Firstname="Andy", Name="Lauwers", Nickname="Pickachu")
    #player_controller.add(connection, new_player)

    # Pas de voornaam van de speler met id 1 aan
    player_controller.patch(1, "Firstname", "John", connection)

    # Laad alle spelers uit de database
    player_controller.getAll(connection)

    # Laad de speler met id 1 uit de database
    player_controller.getById(1, connection)

    # Verwijder de speler met id 12 uit de database
    player_controller.delete(15, connection)
    # Sluit de verbinding met de database
    connection.close()

if __name__ == "__main__": # Als dit bestand wordt uitgevoerd als hoofdprogramma, voer dan de main() functie uit
    main()
