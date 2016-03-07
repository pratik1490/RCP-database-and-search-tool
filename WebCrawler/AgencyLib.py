__author__ = 'Pratik'
import sys

class AgencyLib:

    # check whether agency exists in database or not
    def agencyExist(self, agencyData, connection):
        try:
            cursor = connection.cursor()
            select = "SELECT count(*) from Agency WHERE Name='{0}'".format(agencyData.name)
            cursor.execute(select)
            counter = cursor.fetchone()
            if counter[0] == 0:
                return False
            else:
                return True
        except:
            e = sys.exc_info()[0]
            print "ERROR : agencyExist : {0}".format(e)

    # insert agency into database
    def insertAgency(self, agencyData, connection):
        try:
            if not self.agencyExist(agencyData, connection):
                cursor = connection.cursor()
                insert = "INSERT INTO Agency (Name) VALUES ('{0}')".format(agencyData.name)
                cursor.execute(insert)
                connection.commit()
            return self.getAgencyId(agencyData, connection)
        except:
            e = sys.exc_info()[0]
            print "ERROR : insertAgency : {0}".format(e)

    # get agency Id from database
    def getAgencyId(self, agencyData, connection):
        try:
            cursor = connection.cursor()
            select = "SELECT Id from Agency WHERE Name='{0}'".format(agencyData.name)
            cursor.execute(select)
            return cursor.fetchone()[0]
        except:
            e = sys.exc_info()[0]
            print "ERROR : getAgencyId : {0}".format(e)