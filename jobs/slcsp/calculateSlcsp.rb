require 'csv'

# store data from slcsp.csv
slcsp_data = {} #key: zipcode, value: :rate
slcsp_header_row = [] #key: zipcode, value: :rate
CSV.foreach("./slcsp.csv") do |row|
  if row[0] == "zipcode"
    slcsp_header_row = row
  else
    slcsp_data[row[0]] = row[1]
  end
end

# collect data from zips.scv in a hash of the form { zipcode: [{:state, :county_code, :name, :rate_area}, ...]}
zips_data = {}
CSV.foreach("./zips.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  # handles leading zeroes in zipcode
  zipcode = row.fields[0].to_i.to_s.length < 5 ? ('%03d' % row.fields[0]).rjust(5, "0") : row.fields[0].to_s

  zips_data[zipcode] ||= []
  zips_data[zipcode].push(Hash[row.headers[1..-1].zip(row.fields[1..-1])])
end

# collect data from plans.scv in a hash of the form { state: {rate_area: [min_rate_0, min_rate_1]}
plans_data = {}
CSV.foreach("./plans.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  plans_data[row.fields[1]] ||= {}
  plans_data[row.fields[1]][row.fields[-1]] ||= []

  if(row.fields[2] == "Silver")
    # push the current rate into arr, then from among the rates in the arr select the two lowest unique values
    plans_data[row.fields[1]][row.fields[-1]] =
      plans_data[row.fields[1]][row.fields[-1]].push(row.fields[-2]).uniq.min(2)
  end
end

# fill slcsp_data hash with rates data by tracing zipcode back to rates
slcsp_data.keys.each do |zipcode|
  if(zips_data[zipcode])
    # this step checks whether all of the data from zips.csv associated with zipcode share the same state and rate_area
    if(zips_data[zipcode].map{|x| x[:state]}.uniq.length == 1 &&
      zips_data[zipcode].map{|x| x[:rate_area]}.uniq.length == 1)

      state = zips_data[zipcode][0][:state]
      rate_area = zips_data[zipcode][0][:rate_area]

      if(plans_data[state] && plans_data[state][rate_area])
        slcsp_data[zipcode] = plans_data[state][rate_area][1]
      end
    end
  end

end

# write rate alongside zipcode in slcsp.csv
CSV.open("./slcsp.csv", "wb") do |csv|
  csv << slcsp_header_row
  [*slcsp_data].each {|row| csv << row}
end
