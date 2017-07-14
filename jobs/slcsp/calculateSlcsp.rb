require 'csv'
require 'byebug'

# [["zipcode", "rate"], ["64148", nil], ["67118", nil], ... ]
# slcsp_data = CSV.read("./slcsp.csv")

slcsp_data = {} #key: zipcode, value: :rate
CSV.foreach("./slcsp.csv") do |row|
  next if row[0] == "zipcode"
  slcsp_data[row[0]] = row[1]
end

zips_data = {} #key: zipcode, value: array of hash with keys of :state, :county_code, :name, :rate_area
CSV.foreach("./zips.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  zips_data[row.fields[0]] ||= []
  zips_data[row.fields[0]].push(Hash[row.headers[1..-1].zip(row.fields[1..-1])])
end

plans_data = {} #keys: state, value: hash with key: rate_area, value: 2 minimum unique rates for the given state and rate_area combo. ex:
  # {
  #   "MI"=>{
  #     6=>[248.99, 250.33],
  #     4=>[258.64, 269]
  #   }
  # }
CSV.foreach("./plans.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  plans_data[row.fields[1]] ||= {} #row.fields[1] is the state
  plans_data[row.fields[1]][row.fields[-1]] ||= [] #row.fields[-1] is the rate_area

  if(row.fields[2] == "Silver")
    # push the current rate into arr, then from among the rates in the arr select the two lowest unique values
    plans_data[row.fields[1]][row.fields[-1]] =
      plans_data[row.fields[1]][row.fields[-1]].push(row.fields[-2]).uniq.min(2)
  end
end

# slcsp_data[1..-1].each do |row|
#   zipcode = row[0]
#
#   if(zips_data[zipcode] && zips_data[zipcode][:state] && zips_data[zipcode][:rate_area])
#     state = zips_data[zipcode][:state]
#     rate_area = zips_data[zipcode][:rate_area]
#   else
#     break
#   end
#
#   if(plans_data[state] && plans_data[state][rate_area])
#     row[1] = plans_data[state][rate_area][1]
#   else
#     break
#   end
# end

# CSV.open("./slcsp.csv", "wb") do |csv|
#   slcsp_data.each { |row| csv << row }
# end

# p slcsp_data
# p "---"
# p plans_data["GA"][7]
# p plans_data["WI"][14]
p plans_data
# p "---"
# p zips_data
# p "---"
# slcsp_data = CSV.read("./slcsp.csv")
# p slcsp_data
