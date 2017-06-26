class Movie < ApplicationRecord
  validate_presence_of :name, :category,:gender,:sinopsys ,:image
  belongs_to :category
  belongs_to :gender
end
