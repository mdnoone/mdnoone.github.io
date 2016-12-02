
The progressMapFiles geodatabase contains 5 layers.


1. Priorities : This layer contains the county shapefiles. The only attribute changed in the layer 
is the Status column. The Status column is filled with values of either "Complete" for a completed county, 
"Priority" for a county that is currently being worked on, "Not Scanned" for a county that was not scanned 
in the original survey, and either "<Null>" or left blank to indicate a county that matches none of the other 
criteria.


2. Progress : This layer contains the township shapefiles. The "Digitizer", "Digitization_Date", "Digitized", 
and "Year" columns are the attributes that are updated. The "Digitizer" column gets filled with the digitizer's 
name, the "Digitization_Date" column gets filled with the date of digitization, the "Digitized" column gets 
filled with a "Yes" if it is digitized or is defaulted to "No" for not digitized, and the "Year" column gets 
filled with a single digit number; for example the year is 2016, which indicates a year value of 4. In contrast 
if the year was back to 2015, the year value would have been 3.


3. PointLine : This layer also contains the township shapefiles. The "PointLine", "Name", and "Date" columns 
are the attributes that are updated. The "PointLine" column gets filled with a "Yes" if the point and line 
features have been completed. The "Name" column gets filled with the name of whomever completed the point and 
line features. The "Date" column gets filled with the date of point and line completion.


4. Attributed : This layer also contains the township shapefiles. The "Attributed" and "Attributer" columns 
are the attributes that are updated. The "Attributed" column gets filled with a "Yes" if it has been attributed. 
The "Attributer" column gets filled with whomever did the attributing.


5. Counties : This layer contains the county shapefiles. It is there for style purposes in the ArcMap document 
only, and has no data updating related with it.




For the Progress, PointLine, and Attributed layer, the column marked as "DTR" is how we search for townships.
We do not edit this value, but it is the main means of data retrieval. 