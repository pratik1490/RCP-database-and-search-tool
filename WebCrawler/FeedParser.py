__author__ = 'Pratik'
from datetime import datetime
from Common import Common
from Constants import Constants
from Agency import Agency
from AgencyLib import AgencyLib
from Author import Author
from AuthorLib import AuthorLib
from StoryLib import StoryLib
import feedparser

def feedParser():
    feed = feedparser.parse('http://feeds.feedburner.com/realclearpolitics/qlMj')

    authorLib = AuthorLib()
    storyLib = StoryLib()
    agencyLib = AgencyLib()


    connection = Common.createConnection(Constants.DB_USER,Constants.DB_DATABASENAME)

    for entry in feed['entries']:
        authorDetails = entry['author'].split(',')
        if len(authorDetails) > 1:
            agency = Agency(0,authorDetails[1].encode("utf8"))
            agencyId = agencyLib.insertAgency(agency,connection)
            author = Author(0, authorDetails[0].encode("utf8"))
            authorId = authorLib.insertAuthor(author, connection)

            pubDate = datetime.strptime(entry['updated'].split(',')[1].split('-')[0].strip(), '%d %b %Y %H:%M:%S').date()
            story = storyLib.getStroy(entry['title'],pubDate,entry['link'],authorId,agencyId)
            storyLib.insertStory(story, connection)
        else:
            agency = Agency(0,authorDetails[0].encode("utf8"))
            agencyId = agencyLib.insertAgency(agency,connection)
            author = Author(0, "")
            authorId = authorLib.insertAuthor(author, connection)

            if authorId == None:
                authorId =0
            pubDate = datetime.strptime(entry['updated'].split(',')[1].split('-')[0].strip(), '%d %b %Y %H:%M:%S').date()
            story = storyLib.getStroy(entry['title'],pubDate,entry['link'],authorId,agencyId)
            storyLib.insertStory(story, connection)

    Common.closeConnection(connection)


def main():
    feedParser()

if  __name__ =='__main__':
    main()