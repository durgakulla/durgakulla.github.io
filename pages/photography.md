---
layout: photos

masonry_filenames:
- alsomudlick.jpg
- bicycle.jpg
- hallway2.jpg
- lady.jpg
- palace.jpg
- mural.jpg
- nyc.jpg
- bear.jpg
- lizard.png
- bee.png
- sealion.jpg
---
<div class="masonry masonry--h">
	{% for filename in page.masonry_filenames %}
		<figure class="masonry-brick masonry-brick--h"><img src="{{ site.github.url }}/assets/masonry/{{ filename }}" class="masonry-img" alt="Masonry Brick"></figure>
  	{% endfor %}

</div>