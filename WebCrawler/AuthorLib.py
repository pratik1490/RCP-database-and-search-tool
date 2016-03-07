__author__ = 'Pratik'
import sys

# contains all the function related to author
class AuthorLib:

    # check whether author exists in database or not
    def authorExist(self, authorData, connection):
        try:
            cursor = connection.cursor()
            select = "SELECT count(*) from Author WHERE Name='{0}'".format(authorData.name)
            cursor.execute(select)
            counter = cursor.fetchone()
            if counter[0] == 0:
                return False
            else:
                return True
        except:
            e = sys.exc_info()[0]
            print "ERROR : authorExist : {0}".format(e)

    # method to insert data into database
    def insertAuthor(self, authorData, connection):
        try:
            if not self.authorExist(authorData, connection):
                cursor = connection.cursor()
                insert = "INSERT INTO Author (Name) VALUES ('{0}')".format(authorData.name)
                cursor.execute(insert)
                connection.commit()
            return self.getAuthorId(authorData,connection)
        except:
            e = sys.exc_info()[0]
            print "ERROR : insertAuthor : {0}".format(e)

    # get author Id from database
    def getAuthorId(self, authorData, connection):
        try:
            cursor = connection.cursor()
            select = "SELECT Id from Author WHERE Name='{0}'".format(authorData.name)
            cursor.execute(select)
            return cursor.fetchone()[0]
        except:
            e = sys.exc_info()[0]
            print "ERROR : getAuthorId : {0}".format(e)

    # get author object from database based on author name
    def getAuthor(self, authorData, connection):
        try:
            cursor = connection.cursor()
            select = "SELECT * from Author WHERE Name='{0}'".format(authorData.name)
            cursor.execute(select)
            return cursor.fetchone()
        except:
            e = sys.exc_info()[0]
            print "ERROR : getAuthor : {0}".format(e)