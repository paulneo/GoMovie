class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.integer :star
      t.string :image
      t.text :sinopsys
      t.references :category, foreign_key: true
      t.references :gender, foreign_key: true

      t.timestamps
    end
  end
end
