class Movie < ApplicationRecord
  belongs_to :category
  belongs_to :gender
end
