#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

$: << File.dirname(__FILE__)

require 'sinatra'
require 'sequel'
require 'json'
require 'config'

Sequel::Model.plugin(:schema)

DB = Sequel.sqlite("quickanswers.db")

class Posts < Sequel::Model
  set_schema do
    primary_key :id
    string :author
    string :mail
    string :del_pass, :default => ""
    string :title
    text :body
    timestamp :time_posted
    timestamp :time_edited
    integer :parent_id
    integer :level
    boolean :deleted, :default => false
  end
end

Posts.create_table unless Posts.table_exists?

class TopicThread
  
  attr_accessor :posts, :num_replies, :time_last_posted, 
    :time_last_edited, :time_topic_started, :topic, :topic_body,
    :topic_author
  
  def initialize(posts)
    @posts = posts
    @time_topic_started = posts.first.time_posted
    @topic = posts.first.title
    @topic_body = posts.first.body
    @topic_author = posts.first.author
    @num_replies  = posts.size - 1
    @time_last_posted = find_newest_post_time
    @time_last_edited = find_newest_edit_time
  end
  
  :private
  
  def find_newest_post_time
    @posts.collect{|c|c.time_posted}.max
  end  

  def find_newest_edit_time
    @posts.collect{|c|c.time_edited}.max
  end  
  
end

helpers do

  def format_text(text)
    text = Rack::Utils.escape_html(text.chomp).gsub(/\n/, "<br />")
    if $AUTO_LINK
      
    else
  end
  
  def format_time(time)
    time.strftime($TIME_FORMAT)
  end

  include Rack::Utils; alias_method :h, :format_text
  include Rack::Utils; alias_method :t, :format_time

  def collect_children(element)
    results = [element]
    children = Posts.where(:parent_id => element.id, :deleted => false).order_by(:time_posted)
    children.each do |child|
      results << collect_children(child)
    end
    return results
  end
end

get '/' do
  parents = Posts.where(:level => 1, :deleted => 0)
  @threads = []
  parents.each do |parent|
    @threads << TopicThread.new(collect_children(parent).flatten)
  end  
  @threads.sort! do |a, b|
    b.time_topic_started <=> a.time_topic_started
  end
  erb :index
end

post '/post' do
  post_id = request[:post_id]
  if post_id != ""
    title = request[:title]
    author = request[:author]
    mail = request[:mail]
    body = request[:body].chomp
    del_pass = request[:del_pass]
    
    post = Posts.find(:id => post_id, :mail => mail, :del_pass => del_pass)
    if post
      data = {
        :author => author,
        :title => title,
        :body => body,
        :time_edited => Time.now
      }
      post.update(data)
    end
    return "true"
  end
  
  if request[:parent_id] == "0"
    title = request[:title]
    level = 1
  else
    parent = Posts.find(:id => request[:parent_id])
    title =  ""
    level = parent.level.to_i + 1
  end
  
  email = request[:mail]
  del_pass = request[:del_pass]
  time_now = Time.now
  data = {
    :author => request[:author],
    :mail => request[:mail],
    :del_pass => request[:del_pass],
    :title => title,
    :body => request[:body].chomp,
    :parent_id => request[:parent_id].to_i,
    :level => level,
    :time_posted => time_now,
    :time_edited => time_now
  }
  
  Posts.create(data)
  return "true"
end

post '/delete' do
  post_id = request[:post_id]
  del_pass = request[:del_pass]  
  mail = request[:mail]
  post = Posts.find(:id => post_id, :del_pass => del_pass, :mail => mail)  
  if post
    post.update(:deleted => true, :time_edited => Time.now)
  end
  return "true"
end

post '/authenticate' do
  post_id = request[:post_id]
  mail = request[:mail]
  del_pass = request[:del_pass]

  if post_id.to_s == "" || post_id.to_s == "undefined"
    return "true" 
  end
  post = Posts.find(:id => post_id, :del_pass => del_pass, :mail => mail)
  if post
    return "true"
  else
    return "false"
  end
end