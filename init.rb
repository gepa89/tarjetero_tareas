Redmine::Plugin.register :tarjetero_tareas do
  name 'Plugin Tarjetero Tareas'
  author 'Enrique Paredes'
  description 'Este es un plugin para Redmine que proporciona una vista de tarjetas movibles para la gestión de tareas.'
  version '0.0.1'
  url 'https://your-plugin-url.com'
  menu :top_menu, :tarjetero_tareas, { controller: 'tarjetas', action: 'index' },
       caption: 'Vista de tareas',
       if: Proc.new { User.current.admin? }
end
