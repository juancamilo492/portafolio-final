---
titulo: "Following the Blue Trail: an interactive space for children to meet their city’s wildlife"
slug: "siguiendo-la-huella-azul"
cliente: "Academic project — proposal for Parque de la Conservación, Medellín"
año: "2025"
rol: "Team lead, working prototype (ESP32 and gesture-controlled game), space render and definition of the experience"
categoria: ["Inmersivo", "Investigación", "UX/UI"]
herramientas: ["ESP32", "OpenCV", "Streamlit", "Python", "Blender"]
destacado: true
orden: 5
resumen: "A proposal for an interactive installation about the wildlife of the Aburrá Valley for children, validated with a working prototype of physical buttons (ESP32) and a gesture-controlled game using computer vision."
imagen_portada: "../../../assets/proyectos/siguiendo-la-huella-azul-portada-en.png"
imagen_alt: "Case cover on a crumpled cream paper texture scattered with pale blue animal paw prints: the title “Following the blue trail” in rounded blue lettering."
---

## The context

How do you get a child from Medellín interested in the bat, the
motmot, the opossum or the glass frog, the animals they share a city with
without knowing it? That was the challenge of this academic project done by
a team of 3: designing "Following the Blue Trail", a temporary interactive
installation proposed for Parque de la Conservación, aimed at children aged
8 to 11 and connected to the concept of Effective Public Space. I led the
team and took on the complete working prototype, the render of the space
and much of the definition of the experience.

The full proposal defines a space of 8.5 × 9.75 meters where blue tracks on
the floor guide the child to a monitor with physical buttons for choosing an
animal; the choice transforms the entire atmosphere (light and sound) and
activates minigames on touchscreens that let the child live what that animal
experiences in the city. The journey is designed as an emotional arc in five
stages: from the curiosity of the entrance to the inspiration of the exit.

## The key design decision

An installation like this costs tens of millions of pesos. Before proposing
that investment, we had to answer the uncomfortable question: do the
interactions work? The decision was to **validate cheaply what would be
expensive to build**: a working prototype with an ESP32 simulating the
physical button panel and a minigame controlled by hand gestures, using
computer vision with OpenCV on top of Streamlit. With that we could put real
people in front of the space's two central interactions without building the
space.

## The validation

We ran tree testing across two sessions with 10 participants at EAFIT's
Medialab, with a structured script, informed consent and video recording. A
limitation we reported transparently: because of scheduling logistics, the
participants were university students and not children. That was enough to
evaluate the information architecture, but not enough to consider the
children's experience validated.

The results gave a revealing contrast:

- **Physical buttons: 80% success.** Navigating the animals' information
  flowed, with minor adjustments (icons on the buttons, relocating the back
  button).
- **Gestures: 50% success.** Half the participants couldn't control the
  game. The gestures weren't intuitive and permanent visual cues were
  missing: two issues of serious severity that we documented along with
  their recommended redesigns.

## The outcome

The project closed with a proposal ready to be implemented: an executive
summary, an assembly sheet with plans, an equipment list, a two-week
schedule and an estimated budget. And with a prototype that had already
shown what worked and what didn't. The most "innovative" interaction (the
gestures) turned out to be the most fragile, and the simplest one (physical
buttons) the most solid: exactly the kind of finding that justifies
prototyping before building.

## What I learned

This project left me with a bittersweet lesson: we never managed to test
with children, our real users. Validating with university students gave us
valuable findings about the architecture and the interactions, but the most
important question, whether a 10-year-old enjoys this, stayed open. I learned
that access to the right users is arranged from day one of the project, with
the same priority as the prototype; if you leave it for the end, you end up
validating with whoever you can and not with whoever you should.

And the data confirmed something I now apply to everything I design: the
simplest interaction beat the most novel one hands down. Innovation isn't in
the sophisticated gesture, it's in it working.
