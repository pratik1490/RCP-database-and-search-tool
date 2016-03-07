__author__ = 'Pratik'
import sys
from bs4 import BeautifulSoup
import urllib as url
from datetime import datetime
from Common import Common
from Constants import Constants
from Agency import Agency
from AgencyLib import AgencyLib
from Author import Author
from AuthorLib import AuthorLib
from Story import Story
from StoryLib import StoryLib

years = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]

months = {2006: 12, 2007: 12, 2008: 12, 2009: 12, 2010: 12, 2011: 12, 2012: 12, 2013: 12, 2014: 12, 2015: 10}

days = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 9, 11: 30, 12: 31}

def crawler():
    for year in years:
        numOfMonths = months[year]
        for month in range(1,numOfMonths +1):
            if month == 2:
                if year % 4 == 0:
                    numOfDays = 29
                else:
                    numOfDays = days[month]
            else:
                numOfDays = days[month]
            for day in range(1,numOfDays+1):
                monthStr = "%02d" % month
                dayStr = "%02d" % day

                thisUrl = 'http://www.realclearpolitics.com/{0}/{1}/{2}'.format(year, monthStr, dayStr)
                print thisUrl
                handle = url.urlopen(thisUrl)

                pageData = handle.read()
                beautyPage = BeautifulSoup(pageData, "html.parser")
                try:
                    alphaData = beautyPage.find(id="alpha")

                    pubDate = datetime(year,month,day)

                    content_data = []
                    if not alphaData == None:
                        for content in alphaData.contents :
                            if str(content.encode("utf8")).startswith(' -') or str(content.encode("utf8")).startswith(' - ') :
                                content_data.append(content)

                        agencyLib = AgencyLib()
                        authorLib = AuthorLib()
                        storyLib = StoryLib()
                        connection = Common.createConnection(Constants.DB_USER,Constants.DB_DATABASENAME)

                        counter = 0
                        for a in alphaData.find_all('a'):
                            if "http://" in a.get('href'):
                                if not counter == len(content_data) :
                                    content = content_data[counter]
                                    authorDetails = content[content.index('-')+1:].split(',')
                                    if len(authorDetails) > 1:
                                        agency = Agency(0,authorDetails[1].encode("utf8"))
                                        agencyId = agencyLib.insertAgency(agency,connection)
                                        author = Author(0, authorDetails[0].encode("utf8"))
                                        authorId = authorLib.insertAuthor(author, connection)
                                    else:
                                        agency = Agency(0,authorDetails[0].encode("utf8"))
                                        agencyId = agencyLib.insertAgency(agency,connection)
                                        author = Author(0, "")
                                        authorId = authorLib.insertAuthor(author, connection)
                                    if "http://www.realclearpolitics.com/" in a.get('href'):
                                        link = a.get('href')
                                        title = a.get_text().decode('utf8')
                                        story = storyLib.getStroy(title,pubDate,link,authorId,agencyId)
                                        storyLib.insertStory(story, connection)
                                        counter = counter + 1
                                    else:
                                        link =a.get('href')
                                        originalLink = a.get('href')
                                        title = a.get_text().decode('utf8')

                                        story = Story(0,title, pubDate, "", link, originalLink,authorId, agencyId)
                                        storyLib.insertStory(story, connection)
                                        counter = counter + 1

                        Common.closeConnection(connection)
                except:
                    e = sys.exc_info()[0]
                    print "ERROR : crawler : {0}".format(e)

def main():
    crawler()

if  __name__ =='__main__':
    main()