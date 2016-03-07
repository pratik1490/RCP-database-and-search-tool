__author__ = 'Pratik'
import mysql.connector

class Common:

    @staticmethod
    def createConnection(username,databaseName):
        return mysql.connector.connect(user=username, database=databaseName,buffered=True)

    @staticmethod
    def closeConnection(connection):
        connection.close()

    @staticmethod
    def removeApostrophe(string):
        return string.replace("'", "''")

    @staticmethod
    def trimString(string):
        return string.strip()

    @staticmethod
    def processStringForSqlQuery(string):
        return Common.trimString(Common.processUnicode(Common.removeApostrophe(string)))

    @staticmethod
    def processUnicode(string):
        return string.replace("\r", " ").replace("\n", " ").replace("\t", '').replace("\"", "")
