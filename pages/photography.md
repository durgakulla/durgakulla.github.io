---
layout: misc
title: Photography

masonry_filenames:
- alsomudlick
- bear
- bicycle
- cinqueterre
- coast
- frog
- hallway1
- hallway2
- lady
- mudlick
- mural
- nyc
- palace
- reptile
- sealion
- waterfall
---
<div class="masonry masonry--h">
	{% for filename in page.masonry_filenames %}
		<figure class="masonry-brick masonry-brick--h"><img src="{{ site.github.url }}/assets/masonry/{{ filename }}.jpg" class="masonry-img" alt="Masonry Brick"></figure>
  	{% endfor %}

</div>
