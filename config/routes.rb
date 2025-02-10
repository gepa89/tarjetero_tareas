# plugins/tarjetero_tareas/config/routes.rb
RedmineApp::Application.routes.draw do
  # Ruta para la vista principal de 'Tarjetas'
  get 'tarjetas', to: 'tarjetas#index', as: 'tarjetas'

  # Ruta para actualizar el estado de una tarea (drag & drop)
  post 'tarjetas/update_status', to: 'tarjetas#update_status', as: 'update_issue_status'
end
