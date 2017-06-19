require 'codewars'

describe "Level: 7 kyu" do
  describe "#box" do
    it "returns correct value" do
      expect(box(2)).to eql(["--", "--"])
      expect(box(3)).to eql(["---", "- -", "---"])
      expect(box(4)).to eql(["----", "-  -", "-  -", "----"])
      expect(box(5)).to eql(["-----", "-   -", "-   -", "-   -", "-----"])
      expect(box(24)).to eql(["------------------------",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "-                      -",
        "------------------------"])
    end
  end
end
