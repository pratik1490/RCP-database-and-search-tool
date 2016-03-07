__author__ = 'Pratik'
from Common import Common

class Story:
    def __init__(self, storyId, storyTitle, storyPubDate, storyDesc, storyLink, storyOrgLink, storyAuthorId,storyAgencyId):
        self.id = storyId
        self.title = Common.processStringForSqlQuery(storyTitle)
        self.pubDate = storyPubDate
        self.description = Common.processStringForSqlQuery(storyDesc)
        self.link = Common.processStringForSqlQuery(storyLink)
        self.originalLink = Common.processStringForSqlQuery(storyOrgLink)
        self.authorId = storyAuthorId
        self.agencyId = storyAgencyId