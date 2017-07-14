require 'csv'

# [["zipcode", "rate"], ["64148", nil], ["67118", nil], ... ]
slcsp_data = CSV.read("./slcsp.csv")
plans_data = CSV.read("./plans.csv")
zips_data = CSV.read("./zips.csv")

CSV.open("./slcsp.csv", "wb") do |csv|
  slcsp_data.each { |row| csv << row }
end

p slcsp_data
p "---"
p plans_data
p "---"
p zips_data
p "---"
slcsp_data = CSV.read("./slcsp.csv")
p slcsp_data
