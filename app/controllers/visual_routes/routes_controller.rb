# app/controllers/visual_routes/routes_controller.rb
module VisualRoutes
  class RoutesController < ApplicationController
    layout 'visual_routes/application'

    def index
      @routes_tree = VisualRoutes::Processor.new.call.to_json.html_safe
    end
  end
end