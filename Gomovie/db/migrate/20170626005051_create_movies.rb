class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.integer :star
      t.string :image
      t.text :sinopsys
      t.string :category
      t.string :gender
      t.integer :price
      t.string :time

      t.timestamps
    end
  end
end
