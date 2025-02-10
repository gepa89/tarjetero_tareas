# plugins/tarjetero_tareas/config/routes.rb
RedmineApp::Application.routes.draw do
    # Define la ruta para acceder a la vista principal de 'Tarjetas'
    # Asegúrate de que el nombre del controlador coincide con el nombre del archivo y la definición en el controlador
    get 'tarjetas', to: 'tarjetas#index', as: 'tarjetas'
  end
  