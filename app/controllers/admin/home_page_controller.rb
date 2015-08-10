class Admin::HomePageController < ApplicationController
  def index
    @training_classes_progress =  TrainingClass.users_training_classes(current_user).take(4)
  end
  def login
      render layout:false
  end
end
