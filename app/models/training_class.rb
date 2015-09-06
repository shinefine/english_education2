class TrainingClass < ActiveRecord::Base
  belongs_to :master_teacher, class_name: :Employee  #班主任
  has_and_belongs_to_many :text_books

  #学员可以属于多个培训班(同时培训班包含多个学员)
  has_and_belongs_to_many :students

  has_many :teachers ,through: :subjects

  has_many :examinations #一个班级能有多个模拟考试(按日期)
  has_many :dictations #一个班级能有多个听写测验(按日期)
  has_many :attendances #一个班级能有多个考勤情况(按日期)
  has_many :homeworks #班级的各个课程的讲师会布置作业。

  has_many :subjects
  accepts_nested_attributes_for :subjects  ,:reject_if => lambda { |a| a[:name].blank? },
                                allow_destroy: true

  validates :exam_type,presence: true
  validates :name,presence: true
  validates :end_date,presence: true
  validates :start_date,presence: true


  #default_scope {order('start_date DESC')}

  #返回用戶所屬的培訓班集合
  def self.users_training_classes(user)
    #todo : optimal
    if (user.student?)
      user.student.training_classes.order(start_date: :desc)
    elsif (user.teacher?)
      user.teacher.training_classes.distinct.order(start_date: :desc)
    elsif (user.employee?)
      if user.can_set_training_class_info?  #管理员/校长
        TrainingClass.all.order(start_date: :desc)
      else
        TrainingClass.where(master_teacher_id: user.employee.id ).order(start_date: :desc)
      end
    end
  end

  def student_attendance(student)
    #返回指定学生的所有出勤记录(针对本培训班的)
    return student.student_attendances.where(attendance_id: self.attendance_ids )
  end


  def student_dictions(student)
    #返回指定学生的所有听写成绩(针对本培训班的)
    return student.dictation_scores.where(dictation_id: self.dictation_ids )
  end




  def student_dictation_summary(student)

    return student_dictions(student).count.to_s + "次"

  end

  def summary_text_book_names_list
    return text_books.map{|tb| tb.name}.join("\n")
  end

  def subject_teachers(subject_name)
    #传入培训班科目类型名称, 参数类似于: sat_cr / :toefl_read /:sat_essay
    #返回这个科目的讲师对象(集合)

    #映射表 将科目名 和 subject表中的name 字段的值 一一对应
    map_table ={ sat_cr:'CR',
                 sat_math:'Math',
                 sat_grammar:'Grammar',
                 sat_essay:'Essay',
                 toefl_read:'Reading',
                 toefl_listen:'Listening',
                 toefl_write:'Writing',
                 toefl_talk:'Speaking'
    }

    field_value =map_table[subject_name]

    self.subjects.where(name:field_value).map{|sub| sub.teacher}


  end

  #培训班起始截止时间总天数
  def days_count
    self.end_date.mjd - self.start_date.mjd + 1
  end

  #判断指定的天数是否在培训班开课时间段内
  def range_index(day)
    # 负数 表示指定日期在开课日期之前,即为还有多少天开课
    # 0 表示指定日期在结束日期之后,即培训班已结束.
    #正整数X 表示指定日期在培训班开课时间段中的第X天
    if day.mjd - self.start_date.mjd >= 0  && day.mjd - self.end_date.mjd <= 0
       days_passed = day.mjd - self.start_date.mjd + 1

    elsif  day.mjd - self.end_date.mjd > 0 #已结束
        0

    else
      day.mjd - self.start_date.mjd  #负整数,尚未开课
    end

  end




end
