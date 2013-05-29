
require 'httparty'
require 'json'
require 'sinatra'
require 'sinatra/json'
require 'bundler/setup'
require 'slim'

Tilt.register Tilt::ERBTemplate, 'html.erb'
class Lead
  include HTTParty
  format :json
  debug_output $stdout
  base_uri 'app.close.io:443'
  basic_auth 'd2e994b0e296377c74ae8036bcf3daaa197307f0573d77fa4426348d', ' '
end

get '/' do
  erb :index
end

get '/plans' do
   content_type :json
  { plans: [{
    id: "1",
    transfer: "50",
    storage: "1",
    price: "100",
    image: 'images/cdnOption1.png'
  }, {
    id: 2,
    transfer: "150",
    storage: "10",
    price: "250",
    image: 'images/cdnOption2.png'
  }, {
    id: 3,
    transfer: "500",
    storage: "25",
    price: "500",
    image: 'images/cdnOption3.png'
  }, {
      id: 4,
      transfer: "custom",
      storage: "custom",
      price: "custom",
      image: 'images/cdnOption5.png'
  }]}.to_json
end

post '/cdnSignUp' do
    lead = {
            :name => params[:company], 
            :contacts => [{ 
              :name => params[:name].to_s,
              :phones => [{ :phone => params[:phone].to_s, :type => "office" }], 
              :emails => [{ :email => params[:email].to_s, :type => "office" }]
            }],
            :custom => { :plan => params[:plan]}
          }.to_json
    response = Lead.post('/api/v1/lead/', {:body => lead, :headers =>
               {'Content-Type' => 'application/json'}})
    if response.success?
        html :thanks
    else
        "Invalid data format. Your information was not submitted. Please try again"
    end
end
