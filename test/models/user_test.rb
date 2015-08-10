require 'test_helper'
require 'minitest/autorun'



describe '用户对象测试（UserTest）' do

  before do
    @new_user = User.new
  end

  after do
  end


  it '应该具备的属性' do


    user_props= [
     :name,
     :email,
     :phone_number,
     :password,
     :role_name, #角色类型(管理员/员工/讲师/学员)
     :created_at,
     :updated_at,
     :qq_number,
     :tinypost_number, #微信号
     :identify_card, #身份证号
     :photo,

    ]
    not_define_props = user_props.reject{|prop_name|@new_user.respond_to? prop_name}
    (not_define_props.count==0).must_equal true ,"用户对象 User 应该拥有指定的属性:#{not_define_props}"
  end

  it '应该具备的关联对象属性' do
    user_link_obj_props= [
        :student,
        :teacher,
        :employee,
    ]
    not_define_props = user_link_obj_props.reject{|prop_name|@new_user.respond_to? prop_name}
    (not_define_props.count==0).must_equal true ,"用户对象 User 应该拥有指定的关联对象属性:#{not_define_props}"
  end
end

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
