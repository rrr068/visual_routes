# lib/visual_routes/processor.rb
module VisualRoutes
  class Processor
    def call
      extracted_routes = RouteExtractor.new.call
      TreeBuilder.new.call(extracted_routes)
    end
  end
end