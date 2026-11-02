// Interacciones del sitio. Todo el contenido funciona sin JavaScript;
// este archivo añade el menú móvil, los filtros del catálogo, el
// asistente de contacto y la carga del video bajo demanda.
(function () {
  'use strict';

  var doc = document;
  var normalizar = function (s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  };

  // --- Menú móvil -----------------------------------------------------------
  var botonMenu = doc.querySelector('[data-menu-boton]');
  if (botonMenu) {
    var alternar = function (abrir) {
      botonMenu.setAttribute('aria-expanded', String(abrir));
      doc.documentElement.classList.toggle('menu-abierto', abrir);
    };
    botonMenu.addEventListener('click', function () {
      alternar(botonMenu.getAttribute('aria-expanded') !== 'true');
    });
    doc.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && botonMenu.getAttribute('aria-expanded') === 'true') {
        alternar(false);
        botonMenu.focus();
      }
    });
    window.matchMedia('(min-width: 64em)').addEventListener('change', function (mq) {
      if (mq.matches) alternar(false);
    });
  }

  // --- Catálogo de temas ----------------------------------------------------
  var filtros = doc.querySelector('[data-filtros]');
  var lista = doc.querySelector('[data-catalogo]');
  if (filtros && lista) {
    filtros.hidden = false;
    var filas = Array.prototype.slice.call(lista.querySelectorAll('[data-tema]'));
    var buscador = filtros.querySelector('input[type="search"]');
    var conteo = filtros.querySelector('[data-conteo]');
    var vacio = doc.querySelector('[data-sin-resultados]');
    var botonesLimpiar = doc.querySelectorAll('[data-limpiar]');
    var total = filas.length;

    var marcados = function (nombre) {
      return Array.prototype.map.call(filtros.querySelectorAll('input[name="' + nombre + '"]:checked'), function (c) { return c.value; });
    };

    var aplicar = function (actualizarUrl) {
      var terminos = normalizar(buscador.value).split(/\s+/).filter(Boolean);
      var intereses = marcados('interes');
      var tipos = marcados('tipo');
      var visibles = 0;

      filas.forEach(function (fila) {
        var texto = fila.getAttribute('data-texto');
        var deFila = { i: fila.getAttribute('data-intereses').split(' '), t: fila.getAttribute('data-tipos').split(' ') };
        var ok = terminos.every(function (t) { return texto.indexOf(t) !== -1; })
          && (!intereses.length || intereses.some(function (k) { return deFila.i.indexOf(k) !== -1; }))
          && (!tipos.length || tipos.some(function (k) { return deFila.t.indexOf(k) !== -1; }));
        fila.hidden = !ok;
        if (ok) visibles++;
      });

      var activos = terminos.length || intereses.length || tipos.length;
      conteo.textContent = !activos
        ? 'Se muestran los ' + total + ' temas.'
        : visibles === 1 ? 'Se muestra 1 de ' + total + ' temas.'
        : 'Se muestran ' + visibles + ' de ' + total + ' temas.';
      vacio.hidden = visibles > 0;
      lista.hidden = visibles === 0;
      botonesLimpiar.forEach(function (b) { if (b.closest('[data-filtros]')) b.hidden = !activos; });

      if (actualizarUrl) {
        var params = new URLSearchParams();
        if (buscador.value.trim()) params.set('q', buscador.value.trim());
        if (intereses.length) params.set('interes', intereses.join(','));
        if (tipos.length) params.set('tipo', tipos.join(','));
        var qs = params.toString();
        history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
      }
    };

    // Estado inicial desde la URL (enlaces compartibles).
    var inicial = new URLSearchParams(location.search);
    buscador.value = inicial.get('q') || '';
    ['interes', 'tipo'].forEach(function (nombre) {
      (inicial.get(nombre) || '').split(',').filter(Boolean).forEach(function (valor) {
        var c = filtros.querySelector('input[name="' + nombre + '"][value="' + CSS.escape(valor) + '"]');
        if (c) c.checked = true;
      });
    });

    filtros.addEventListener('input', function () { aplicar(true); });
    filtros.addEventListener('change', function () { aplicar(true); });
    filtros.addEventListener('submit', function (ev) { ev.preventDefault(); });
    botonesLimpiar.forEach(function (b) {
      b.addEventListener('click', function () {
        filtros.reset();
        buscador.value = '';
        aplicar(true);
        buscador.focus();
      });
    });
    aplicar(false);
  }

  // --- Asistente de contacto ------------------------------------------------
  var form = doc.querySelector('[data-contacto]');
  if (form) {
    var sitio = form.getAttribute('data-sitio') || '';
    var campo = function (id) { return form.querySelector('#' + id); };
    var estado = form.querySelector('[data-estado]');
    var vistaPara = form.querySelector('[data-vista-para]');
    var vistaAsunto = form.querySelector('[data-vista-asunto]');
    var vistaCuerpo = form.querySelector('#vista-cuerpo');
    var selectTema = campo('tema');

    // Tema preseleccionado desde ?tema=<slug>
    var temaUrl = new URLSearchParams(location.search).get('tema');
    if (temaUrl && selectTema.querySelector('option[value="' + CSS.escape(temaUrl) + '"]')) {
      selectTema.value = temaUrl;
      if (temaUrl !== 'otro' && temaUrl !== 'sin-tema') {
        var tesis = form.querySelector('input[name="motivo"][value="tesis"]');
        if (tesis) tesis.checked = true;
      }
    }

    var destinatarios = function () {
      return Array.prototype.filter.call(form.querySelectorAll('input[name="para"]'), function (c) { return c.checked; });
    };

    var componer = function () {
      var val = function (id) { return campo(id).value.trim(); };
      var nombre = val('nombre');
      var opcionTema = selectTema.options[selectTema.selectedIndex];
      var temaTexto = selectTema.value === 'sin-tema' ? '' : opcionTema.text;
      var motivo = form.querySelector('input[name="motivo"]:checked');
      var motivoTexto = motivo ? motivo.parentNode.textContent.trim() : '';
      var intereses = Array.prototype.map.call(form.querySelectorAll('input[name="intereses"]:checked'), function (c) { return c.value; });
      var para = destinatarios();
      var saludo = para.length ? 'Hola, ' + para.map(function (c) { return c.getAttribute('data-nombre'); }).join(' y ') + ':' : 'Hola:';

      var asunto = sitio + ': ' + (selectTema.value === 'otro' ? 'propuesta de tema'
        : temaTexto ? 'interés en el tema ' + temaTexto.replace(/^\d+\.\s*/, '«').replace(/$/, '»')
        : (motivoTexto || 'consulta').toLowerCase());

      var presentacion = [];
      if (nombre) presentacion.push('Me llamo ' + nombre + '.');
      var estudio = [];
      if (val('carrera')) estudio.push(val('carrera'));
      if (val('universidad')) estudio.push('en ' + val('universidad'));
      if (estudio.length) presentacion.push('Estudio ' + estudio.join(' ') + (val('nivel') ? ' (' + val('nivel') + ').' : '.'));
      else if (val('nivel')) presentacion.push('Curso ' + val('nivel') + '.');

      var lineas = [saludo, ''];
      if (presentacion.length) lineas.push(presentacion.join(' '), '');
      if (motivoTexto) lineas.push('Motivo: ' + motivoTexto + '.');
      lineas.push('Tema: ' + (selectTema.value === 'sin-tema' ? 'aún no tengo uno definido' : temaTexto) + '.');
      if (intereses.length) lineas.push('Áreas de interés: ' + intereses.join(', ') + '.');
      lineas.push('');
      if (val('formacion')) lineas.push('Materias cursadas y experiencia:', val('formacion'), '');
      if (val('mensaje')) lineas.push(val('mensaje'), '');
      lineas.push('Saludos,', nombre || '');

      return {
        para: para.map(function (c) { return c.value; }),
        asunto: asunto,
        cuerpo: lineas.join('\n').replace(/\n{3,}/g, '\n\n').trim(),
      };
    };

    var actualizar = function () {
      var m = componer();
      vistaPara.textContent = m.para.length ? m.para.join(', ') : '(elige al menos un destinatario)';
      vistaAsunto.textContent = m.asunto;
      vistaCuerpo.value = m.cuerpo;
      return m;
    };

    var avisar = function (texto, tipo) {
      estado.textContent = texto;
      estado.className = 'estado' + (tipo ? ' es-' + tipo : '');
    };

    var validar = function () {
      var nombre = campo('nombre');
      if (!nombre.value.trim()) {
        nombre.setAttribute('aria-invalid', 'true');
        avisar('Escribe tu nombre antes de continuar.', 'error');
        nombre.focus();
        return false;
      }
      nombre.removeAttribute('aria-invalid');
      if (!destinatarios().length) {
        avisar('Elige al menos un destinatario en «Para».', 'error');
        form.querySelector('input[name="para"]').focus();
        return false;
      }
      return true;
    };

    form.addEventListener('input', function () { actualizar(); });
    form.addEventListener('change', function () { actualizar(); });
    form.addEventListener('submit', function (ev) { ev.preventDefault(); });

    form.querySelector('[data-preparar]').addEventListener('click', function () {
      if (!validar()) return;
      var m = actualizar();
      var url = 'mailto:' + m.para.join(',')
        + '?subject=' + encodeURIComponent(m.asunto)
        + '&body=' + encodeURIComponent(m.cuerpo.replace(/\n/g, '\r\n'));
      window.location.href = url;
      avisar('Intentamos abrir tu aplicación de correo con el mensaje listo. Revísalo y envíalo desde allí: todavía no se ha enviado nada. Si no se abrió, usa «Copiar mensaje» y escribe a ' + m.para.join(' y ') + '.');
    });

    form.querySelector('[data-copiar]').addEventListener('click', function () {
      if (!validar()) return;
      var m = actualizar();
      var texto = 'Asunto: ' + m.asunto + '\n\n' + m.cuerpo;
      var exito = function () {
        avisar('Mensaje copiado al portapapeles. Pégalo en un correo nuevo para ' + m.para.join(' y ') + ' y envíalo desde allí.', 'exito');
      };
      var respaldo = function () {
        vistaCuerpo.value = texto;
        vistaCuerpo.select();
        var ok = false;
        try { ok = doc.execCommand('copy'); } catch (e) { ok = false; }
        vistaCuerpo.value = m.cuerpo;
        if (ok) exito();
        else avisar('No pudimos copiar automáticamente. Selecciona el texto de la vista previa y cópialo a mano.', 'error');
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(exito, respaldo);
      } else {
        respaldo();
      }
    });

    actualizar();
  }

  // --- Video bajo demanda -----------------------------------------------------
  doc.querySelectorAll('[data-video]').forEach(function (contenedor) {
    var id = contenedor.getAttribute('data-video');
    var titulo = contenedor.getAttribute('data-titulo') || 'Video';
    var cargar = function (inicio, conFoco) {
      var src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0' + (inicio ? '&start=' + inicio : '');
      var iframe = contenedor.querySelector('iframe');
      if (!iframe) {
        iframe = doc.createElement('iframe');
        iframe.title = titulo;
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        contenedor.innerHTML = '';
        contenedor.appendChild(iframe);
      }
      iframe.src = src;
      if (conFoco) iframe.focus();
    };
    var portada = contenedor.querySelector('[data-video-reproducir]');
    if (portada) {
      portada.addEventListener('click', function (ev) {
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
        ev.preventDefault();
        cargar(0, true);
      });
    }
    doc.querySelectorAll('[data-inicio]').forEach(function (enlace) {
      enlace.addEventListener('click', function (ev) {
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
        ev.preventDefault();
        cargar(parseInt(enlace.getAttribute('data-inicio'), 10) || 0, false);
        contenedor.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      });
    });
  });

  // --- Plazos de convocatorias --------------------------------------------
  // Si la página se compiló antes de un cierre que ya pasó, actualiza el texto.
  var hoy = new Date();
  var hoyIso = hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0') + '-' + String(hoy.getDate()).padStart(2, '0');
  doc.querySelectorAll('[data-cierre]').forEach(function (el) {
    if (hoyIso > el.getAttribute('data-cierre') && !el.classList.contains('es-cerrada')) {
      el.textContent = el.getAttribute('data-texto-cerrado');
      el.classList.add('es-cerrada');
    }
  });
})();
