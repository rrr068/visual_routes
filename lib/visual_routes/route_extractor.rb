# lib/visual_routes/route_extractor.rb
module VisualRoutes
  class RouteExtractor
    def call
      extract_routes
    end

    private

    def extract_routes
      Rails.application.routes.routes.map do |route|
        path = route.path.spec.to_s.gsub('(.:format)', '')
        verb = extract_verb(route)
        controller = route.requirements[:controller]
        action = route.requirements[:action]
        name = route.name

        { path: path, verb: verb, controller: controller, action: action, name: name }
      end.compact
    end

    def extract_verb(route)
      case route.verb
      when String then route.verb
      when Array then route.verb.join('|')
      else 'ANY'
      end
    end
  end
end