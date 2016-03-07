__author__ = 'Pratik'
from Common import Common


class Author:
    def __init__(self, authorId, name):
        self.authorId = authorId
        self.name = Common.processStringForSqlQuery(name)