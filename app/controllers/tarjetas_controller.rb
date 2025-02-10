# app/controllers/tarjetas_controller.rb
class TarjetasController < ApplicationController
    before_action :find_project, only: [:index]
  
    def index
      @issues = Issue.all.order("created_on DESC")
  
      # Filtra por project_id si está presente
      @issues = @issues.where(project_id: params[:project_id]) if params[:project_id].present?
  
      # Filtra por issue_id si está presente
      @issues = @issues.where(id: params[:issue_id]) if params[:issue_id].present?
  
      # Filtra por user_id (assigned_to_id) si está presente
      @issues = @issues.where(assigned_to_id: params[:user_id]) if params[:user_id].present?
  
      # Filtra por rango de fechas de creación si están presentes ambos
      if params[:start_date].present? && params[:end_date].present?
        @issues = @issues.where(created_on: params[:start_date]..params[:end_date])
      end
    end
  
    private
  
    def find_project
      @project = Project.find(params[:project_id]) if params[:project_id].present?
    end
  end
  