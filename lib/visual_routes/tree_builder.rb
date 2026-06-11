# lib/visual_routes/tree_builder.rb
module VisualRoutes
  class TreeBuilder
    def call(routes_data)
      build_tree(routes_data)
    end

    private

    def build_tree(routes_data)
      root = { name: '/', children: [] }

      routes_data.each do |route|
        parts = route[:path].split('/').reject(&:empty?)
        current_node = root

        parts.each_with_index do |part, i|
          node_name = part.start_with?(':') ? "{#{part.delete_prefix(':')}}" : part

          child = current_node[:children].find { |c| c[:name] == node_name }

          unless child
            child = { name: node_name, children: [] }
            current_node[:children] << child
          end

          current_node = child

          if i == parts.length - 1
            current_node[:routes] ||= []
            current_node[:routes] << route.except(:path)
          end
        end
      end
      root
    end
  end
end