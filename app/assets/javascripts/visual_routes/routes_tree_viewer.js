// app/assets/javascripts/visual_routes/routes_tree_viewer.js

window.VisualRoutes = window.VisualRoutes || {};

VisualRoutes.drawTree = function(data, containerSelector) {
  const margin = { top: 20, right: 90, bottom: 30, left: 90 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // SVGコンテナを作成
  const svg = d3.select(containerSelector).append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // D3ツリーレイアウトを定義
  const treemap = d3.tree().size([height, width]);

  // ルートノードを設定
  let root = d3.hierarchy(data, d => d.children);
  root.x0 = height / 2;
  root.y0 = 0;

  // 初期描画
  update(root);

  function update(source) {
    const treeData = treemap(root);
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    nodes.forEach(d => { d.y = d.depth * 180; });

    // ノードの更新
    const node = svg.selectAll("g.node")
        .data(nodes, d => d.id || (d.id = ++i));

    const nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", d => "translate(" + source.y0 + "," + source.x0 + ")");

    nodeEnter.append("circle")
        .attr("class", "node-circle")
        .attr("r", 1e-6)
        .style("fill", d => d.children ? "#fff" : "#999");

    nodeEnter.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children || d._children ? -13 : 13)
        .attr("text-anchor", d => d.children || d._children ? "end" : "start")
        .text(d => d.data.name);

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(750)
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

    nodeUpdate.select("circle.node-circle")
        .attr("r", 10)
        .style("fill", d => d._children ? "lightsteelblue" : "#fff");

    // リンクの更新
    const link = svg.selectAll("path.link")
        .data(links, d => d.id);

    const linkEnter = link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", d => diagonal(d, d.parent));

    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(750)
        .attr("d", d => diagonal(d, d.parent));

    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    function diagonal(s, d) {
      return `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;
    }
  }
};

// DOMContentLoadedで描画を実行
document.addEventListener("DOMContentLoaded", function() {
  if (typeof routesData !== "undefined") {
    VisualRoutes.drawTree(routesData, "#routes-tree-container");
  }
});