class PlayerController(object):
    # de prints mogen er uit na connectie met react

    def __init__(self, Firstname=None, Name=None, Nickname=None):
        self.Firstname = Firstname
        self.Name = Name
        self.Nickname = Nickname
    
    @classmethod
    def getAll(cls, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Player")
        playerValue = cursor.fetchall()
        print("All players from the database:\n") 
        for player in playerValue:
            cls.printPlayer(player)
        print("")
        return playerValue
    
    @classmethod
    def getById(cls, id, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Player WHERE IdPlayer = ?", (id, ))
        playerValue = cursor.fetchone()
        print(f"Player with id {id} fom the database:")
        cls.printPlayer(playerValue) 
        print("")
        return playerValue
    
    @classmethod
    def patch(cls, id, field, new_value, connection):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Player WHERE IdPlayer = ?", (id, ))
        playerValue = cursor.fetchone()

        if playerValue is not None:
            if field == "Firstname":
                playerValue[1] = new_value
                cursor.execute("UPDATE Player SET Firstname = ? WHERE IdPlayer = ?", (new_value, id))
            if field == "Name":
                playerValue[2] = new_value
                cursor.execute("UPDATE Player SET Name = ? WHERE IdPlayer = ?", (new_value, id))
            if field == "Nickname":
                playerValue[3] = new_value
                cursor.execute("UPDATE Player SET Nickname = ? WHERE IdPlayer = ?", (new_value, id))
            connection.commit()
        else:
            print(f"Player with ID {id} does not exist.")


    @classmethod
    def add(cls, connection, newPlayer):
        cursor = connection.cursor()
        cursor.execute("INSERT INTO Player (Firstname, Name, Nickname) VALUES (?, ?, ?)",
                   (newPlayer.Firstname, newPlayer.Name, newPlayer.Nickname))
        connection.commit()

    @classmethod
    def delete(cls, id, connection):
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Player WHERE IdPlayer like ?", (id, ))
        connection.commit()

        if cursor.rowcount > 0:
            print(f"Player with ID {id} deleted.")
        else:
            print(f"Player with ID {id} does not exist.")


    @classmethod
    def printPlayer(cls, player):
        print(f"ID: {player[0]} - Firstname: {player[1]} - Name: {player[2]} - Nickname: {player[3]}")
        return player
