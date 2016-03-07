__author__ = 'Pratik'
from Common import Common

class Agency:
    def __init__(self, agencyId, agencyName):
        self.id = agencyId
        self.name = Common.processStringForSqlQuery(agencyName)
