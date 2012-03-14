require 'rubygems'
require 'sinatra'
require 'data_mapper'
require 'date'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/db/results.db")

class Trial
  include DataMapper::Resource

  property :id, Serial
  property :data, Text
  property :created_at, DateTime
end


DataMapper.finalize
DataMapper.auto_upgrade!

get '/' do 
  redirect '/index.html'
end

post '/trials.json' do
  trial = Trial.new
  trial.data = params[:data]
  trial.created_at = DateTime.now
  if trial.save then
    200  
  else
    500
  end
end