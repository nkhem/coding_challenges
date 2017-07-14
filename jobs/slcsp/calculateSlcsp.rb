require 'csv'
require 'byebug'

# [["zipcode", "rate"], ["64148", nil], ["67118", nil], ... ]
slcsp_data = CSV.read("./slcsp.csv")

plans_data = Hash.new() #keys: state/rate_area, value: metal_level, rate
CSV.foreach("./plans.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  plans_data[row.fields[1]] ||= {}
  plans_data[row.fields[1]][row.fields[-1]] ||= []
  if(row.fields[2] == "Silver")
    # push the current rate into arr, then from among them select the two lowest unique values
    plans_data[row.fields[1]][row.fields[-1]] =
      plans_data[row.fields[1]][row.fields[-1]].push(row.fields[-2]).uniq.min(2)
  end
end

zips_data = {} #keys: zipcode, values: :state, :county_code, :name, :rate_area
CSV.foreach("./zips.csv", :headers => true, :header_converters => :symbol, :converters => :all) do |row|
  zips_data[row.fields[0].to_s] = Hash[row.headers[1..-1].zip(row.fields[1..-1])]
end

slcsp_data[1..-1].each do |row|
  zipcode = row[0]

  if(zips_data[zipcode] && zips_data[zipcode][:state] && zips_data[zipcode][:rate_area])
    state = zips_data[zipcode][:state]
    rate_area = zips_data[zipcode][:rate_area]
  else
    break
  end

  if(plans_data[state] && plans_data[state][rate_area])
    row[1] = plans_data[state][rate_area][1]
  else
    break
  end
end

CSV.open("./slcsp.csv", "wb") do |csv|
  slcsp_data.each { |row| csv << row }
end

# p slcsp_data
# p "---"
# p plans_data["GA"][7]
# p plans_data["WI"][14]
# p plans_data
# p "---"
# p zips_data
# p "---"
# slcsp_data = CSV.read("./slcsp.csv")
# p slcsp_data
