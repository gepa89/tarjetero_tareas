# app/controllers/tarjetas_controller.rb
class TarjetasController < ApplicationController
    before_action :find_project, only: [:index]
  
    def index
      @statuses = IssueStatus.order(:position) # Cargar los estados de las tareas
      @issues = Issue.all.order("created_on DESC")
      @issues = Issue.includes(:status, :priority, :assigned_to, :category, :author)
    
  
      # Filtros
      filter_by_project
      filter_by_issue
      filter_by_user
      filter_by_date_range
    end
  
    # Actualizar el estado de la tarea (para drag & drop)
    def update_status
      issue = Issue.find(params[:issue_id])
      if issue.update(status_id: params[:status_id])
        render json: { success: true }
      else
        render json: { success: false, errors: issue.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def find_project
      @project = Project.find(params[:project_id]) if params[:project_id].present?
    end
  
    # Métodos de filtrado
    def filter_by_project
      @issues = @issues.where(project_id: params[:project_id]) if params[:project_id].present?
    end
  
    def filter_by_issue
      @issues = @issues.where(id: params[:issue_id]) if params[:issue_id].present?
    end
  
    def filter_by_user
      @issues = @issues.where(assigned_to_id: params[:user_id]) if params[:user_id].present?
    end
  
    def filter_by_date_range
      if params[:start_date].present? && params[:end_date].present?
        @issues = @issues.where(created_on: params[:start_date]..params[:end_date])
      end
    end
  end
  