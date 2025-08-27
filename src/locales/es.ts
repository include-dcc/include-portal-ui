/* eslint-disable max-len */
import translations from './es.json'; /* eslint-disable max-len */

const filesFacets = {
  data_category: 'Categoría de Datos',
  controlled_access: 'Acceso Controlado',
  data_type: 'Tipo de Datos',
  file_format: 'Formato de Archivo',
  file_id: 'ID de Archivo',
  size: 'Tamaño',
  access: 'Acceso',
  sequencing_experiment: {
    experiment_strategy: 'Estrategia Experimental',
  },
  acl: 'ACL',
};

const es = {
  ...translations,
  date: {
    years: '{years, plural, =0 {} =1 {año} other {años}}',
    days: '{days, plural, =0 {} =1 {día} other {días}}',
  },
  // Global
  global: {
    yes: 'Sí',
    no: 'No',
    other: 'Otro',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    analyse: 'Análisis',
    save: 'Guardar',
    pleaseDescribe: 'Por favor, describa',
    connect: 'Conectar',
    viewInExploration: 'Ver en exploración',
    search: {
      genes: {
        emptyText: 'No se encontró ningún gen',
        placeholder: 'p. ej., BRAF, ENSG00000157764',
        title: 'Buscar por gen',
        tooltip: 'Ingrese un símbolo de gen, alias de gen o ID de Ensembl',
      },
      samples: {
        emptyText: 'No se encontró ninguna muestra',
        placeholder: 'p. ej., bs-z8p7wjm7',
        title: 'Buscar por ID de muestra',
        tooltip: 'Ingrese un ID de muestra',
      },
      variants: {
        emptyText: 'No se encontró ninguna variante',
        placeholder: 'p. ej., 10-100063679-C-T, rs341',
        title: 'Buscar por variante',
        tooltip:
          'Ingrese un locus de variante, símbolo de gen, alias de gen, cambio de AA en el gen, ID de dbSNP, ID de ClinVar, ID de Ensembl, ID de RefSeq',
      },
      study: {
        emptyText: 'No se encontró ningún estudio',
        placeholder: 'p. ej., KF DSD, Neuroblastoma',
        title: 'Buscar por estudio',
        tooltip: 'Buscar por código de estudio, nombre del estudio, número de acceso dbGaP',
      },
      participant: {
        emptyText: 'No se encontraron participantes',
        placeholder: 'p. ej., pt-005X8BR9, HTP0001',
        title: 'Buscar por ID de participante',
        tooltip: 'Buscar por ID de participante o ID de participante externo',
      },
      participantSet: {
        emptyText: 'No se encontraron conjuntos de participantes',
        placeholder: 'Selecciona un conjunto guardado',
        title: 'Conjuntos de Participantes Guardados',
      },
      biospecimen: {
        emptyText: 'No se encontraron muestras',
        placeholder: 'p. ej., bs-019260B4, SSH3953290',
        title: 'Buscar por ID de muestra',
        tooltip: 'Buscar por ID de muestra o ID de muestra externo',
        collection: {
          emptyText: 'No se encontró ningún ID de colección',
          placeholder: 'p. ej., bs-022KAEZW',
          title: 'Buscar por ID de colección',
        },
      },
      biospecimenSet: {
        title: 'Conjuntos de Biospecímenes Guardados',
        emptyText: 'No se encontraron conjuntos de muestras',
      },
      file: {
        emptyText: 'No se encontraron archivos',
        placeholder: 'p. ej., GF_001CSF26',
        title: 'Buscar por ID de archivo',
      },
      fileSet: {
        title: 'Conjuntos de Archivos Guardados',
        emptyText: 'No se encontraron conjuntos de archivos',
      },
    },
    filters: {
      actions: {
        all: 'Todos',
        none: 'Ninguno',
        clear: 'Limpiar',
        less: 'Menos',
        more: 'Más',
        apply: 'Aplicar',
      },
      operators: {
        between: 'Entre',
        lessthan: 'Menor que',
        lessthanorequal: 'Menor o igual que',
        greaterthan: 'Mayor que',
        greaterthanorequal: 'Mayor o igual que',
      },
      range: {
        is: 'Es',
      },
      messages: {
        empty: 'No se encontraron valores',
      },
      checkbox: {
        placeholder: 'Buscar...',
      },
      quickfilter: {
        placeholder: 'Buscar...',
        emptyMessage: 'Mín. 3 caracteres',
        placeholderError: 'Caracteres prohibidos  ( ) [ ] | \\',
      },
    },
    forms: {
      errors: {
        minCharacters: 'mínimo de caracteres',
        requiredField: 'Este campo es obligatorio',
        enterValidEmail: 'Ingrese un correo electrónico válido',
        enterValidUrl: 'Ingrese una URL válida',
      },
    },
    errors: {
      403: 'Lo sentimos, no está autorizado para acceder a esta página.',
      404: 'Lo sentimos, la página que visitó no existe.',
      500: 'Lo sentimos, algo salió mal.',
      backHome: 'Volver al inicio',
      query: {
        notFound: {
          title: 'Consulta no encontrada',
          content:
            'No pudimos cargar su consulta. Inténtelo de nuevo o <a href="{href}" style="text-decoration: underline;" target="_blank">contacte al soporte</a>.',
          okText: 'Cerrar',
        },
      },
    },
    notification: {
      genericError: 'Ocurrió un error',
    },
    proTable: {
      clear: 'Limpiar',
      clearFilters: 'Limpiar filtros',
      result: 'Resultado',
      results: 'Resultados',
      noResults: 'Sin resultados',
      of: 'de',
      selected: 'elemento seleccionado',
      selectedPlural: 'elementos seleccionados',
      selectAll: 'Seleccionar todos los resultados',
      tooltips: {
        tableExport: 'Exportar como TSV',
      },
      columnSelector: {
        tooltips: {
          columns: 'Columnas',
        },
        reset: 'Restablecer',
      },
    },
    viewInDataExploration: 'Ver en exploración de datos',
  },
  maintenance: {
    title: 'Actualmente estamos en mantenimiento',
    subtitle:
      'Pedimos disculpas por cualquier inconveniente y agradecemos su comprensión mientras trabajamos para restaurar el portal.',
  },
  // API
  api: {
    savedFilter: {
      error: {
        title: 'Error',
        messageUpdate: 'No se pudo actualizar el filtro',
        messageDelete: 'No se pudo eliminar el filtro',
        nameAlreadyExists: 'Ya existe un filtro con este nombre',
      },
      success: {
        messageSaved: 'Filtro guardado',
        messageDeleted: 'Filtro eliminado',
      },
    },
    savedSet: {
      modal: {
        okText: 'Guardar',
        name: 'Nombre',
        placeholder: 'Ingresa el nombre de tu nuevo conjunto',
      },
      error: {
        duplicate: 'Ya existe un conjunto con este nombre',
        title: 'Error',
        temporary: 'No se pudo agregar el conjunto a la exploración de datos',
        messageUpdate: 'No se pudo actualizar el conjunto',
        messageDelete: 'No se pudo eliminar el conjunto',
        messageCreate: 'No se pudo crear el conjunto',
      },
      success: {
        titleCreate: 'Tu conjunto ha sido guardado.',
        temporary: 'Conjunto agregado a la exploración de datos.',
        messageCreate:
          'Puedes agregar tus conjuntos a una consulta desde la barra lateral o el panel de control.',
        titleUpdate: 'Éxito',
        messageUpdate: 'Tu conjunto ha sido actualizado.',
      },
    },
    biospecimenRequest: {
      error: {
        messageUpdate: 'No se pudo actualizar la solicitud de biospecimen',
        messageDelete: 'No se pudo eliminar la solicitud de biospecimen',
        manifestReport:
          'Ocurrió un error y no pudimos descargar tu archivo. Por favor, intenta nuevamente.',
      },
      success: {
        messageUpdate: 'Tu solicitud de biospecimen ha sido actualizada.',
        manifestReport: 'Manifiesto descargado con éxito.',
      },
    },
    cavatica: {
      error: {
        title: 'Error',
        projects: {
          fetch: 'No se pudo obtener tus proyectos de Cavatica.',
          create: 'No se pudo crear tu proyecto de Cavatica.',
        },
        billingGroups: {
          fetch: 'No se pudo obtener tus grupos de facturación de Cavatica.',
        },
        bulk: {
          import: 'No se pudo copiar los archivos a tu proyecto',
          fetchFiles: 'No se pudo obtener los archivos seleccionados',
        },
        fileAuth: {
          title: 'Archivos no autorizados',
          description:
            'No estás autorizado para analizar los archivos que has seleccionado. Aprende más sobre el acceso a los datos.',
        },
      },
      success: {
        title: 'Éxito',
        description: `<div><p>Tus archivos han sido copiados a: <strong>{destination}</strong></p>
      <p>Si has subido más de 10,000 archivos en los últimos 5 minutos, la importación puede tardar un poco más.</p>
      <a href="{userBaseUrl}" rel="noreferrer" style="color:unset;text-decoration:underline;" target="_blank">Abrir proyecto en Cavatica</a><div>`,
        projects: {
          create: 'Proyecto creado con éxito',
        },
        bulk: {
          import: {
            copySuccess: 'Tus archivos han sido copiados a: <strong>{destination}</strong>',
            possibleDelays:
              'Si has subido más de 10,000 archivos en los últimos 5 minutos, la importación puede tardar un poco más.',
            openProject: 'Abrir proyecto en Cavatica',
          },
        },
      },
    },
    report: {
      biospecimenData: {
        download: 'Descargar datos de muestra',
      },
      clinicalData: {
        download: 'Descargar datos clínicos',
        family:
          '{count, plural, =0 {Participante seleccionado y familia} =1 {Participante seleccionado y familia} other {Participantes seleccionados y familias}}',
        participant:
          '{count, plural, =0 {Participante seleccionado} =1 {Participante seleccionado} other {Participantes seleccionados}}',
      },
      loading: {
        message: 'Tu descarga está siendo preparada. Este proceso puede tardar varios minutos.',
      },
      error: {
        title: 'Error',
        message:
          'Ha ocurrido un error. No se pudo procesar tu descarga. Por favor, intenta nuevamente o <a target="_blank" href="{mailto}" style="color: unset; text-decoration: underline;">contacta al soporte</a>.',
        tooMuchFilesTitle: 'Número máximo excedido',
        tooMuchFiles:
          'Se puede incluir un máximo de 10,000 archivos a la vez. Por favor, reduce tu selección e intenta nuevamente.',
      },
      inProgress: {
        title: 'Procesando',
        fetchReport: 'Obteniendo reporte, por favor espera',
      },
      onSuccess: {
        title: 'Éxito',
        fetchReport: 'Reporte descargado con éxito',
      },
      fileManifest: {
        button: 'Manifiesto',
        title: 'Manifiesto de archivos',
        okText: 'Descargar',
        cancel: 'Cancelar',
        text: `Descarga un manifiesto de los archivos seleccionados que puede ser utilizado para descargas masivas usando el <a target="_blank" href="https://docs.cavatica.org/docs/import-from-a-drs-server" style="text-decoration: underline;">Importar desde un Servidor de Repositorio de Datos GA4GH (DRS)</a> de Cavatica. Este manifiesto también incluye información adicional, incluyendo el participante y las muestras asociadas a estos archivos.`,
        subText: 'En desarrollo y estará disponible pronto.',
        textCheckbox: `Incluir archivos de datos del mismo tipo para los miembros de la familia relacionados con los participantes para esta selección.`,
        summary: 'Resumen',
        dataType: 'Tipo de datos',
        participants: 'Participantes',
        files: 'Archivos',
        size: 'Tamaño',
      },
    },
    noData: 'No hay datos',
  },
  // COMPONENTS
  components: {
    filterList: {
      collapseAll: 'Colapsar todo',
      expandAll: 'Expandir todo',
    },
    table: {
      itemCount: {
        singlePage: '{count, plural, =0 {Sin resultados} other {<strong>#</strong> resultados}}',
        multiplePages:
          'Resultados <strong>{from}</strong> - <strong>{to}</strong> de <strong>{total}</strong>',
      },
    },
    suggester: {
      error: {
        title: 'Error',
        description: 'Ocurrió un error al obtener las sugerencias',
      },
      noResultsFound: 'No se encontraron resultados',
    },
    querybuilder: {
      defaultTitle: 'Filtro sin título',
      header: {
        modal: {
          edit: {
            title: 'Editar filtro',
            okText: 'Guardar',
            cancelText: 'Cancelar',
            input: {
              label: 'Nombre del filtro',
              placeholder: 'Filtro sin título',
              maximumLength: 'máximo de caracteres',
            },
          },
          confirmUnsaved: {
            title: 'Cambios no guardados',
            openSavedFilter: {
              okText: 'Continuar',
              cancelText: 'Cancelar',
              content:
                'Estás a punto de abrir un filtro guardado; todas las modificaciones se perderán.',
            },
            createNewFilter: {
              okText: 'Crear',
              cancelText: 'Cancelar',
              content:
                'Estás a punto de crear un nuevo filtro; todas las modificaciones se perderán.',
            },
          },
        },
        popupConfirm: {
          delete: {
            title: '¿Eliminar este filtro permanentemente?',
            okText: 'Eliminar filtro',
            cancelText: 'Cancelar',
            content: 'Estás a punto de eliminar permanentemente este filtro y todas sus consultas.',
          },
        },
        tooltips: {
          newQueryBuilder: 'Nuevo filtro',
          save: 'Guardar filtro',
          saveChanges: 'Guardar cambios',
          saveDisabled: 'Añade una consulta para guardar',
          delete: 'Eliminar filtro',
          duplicateQueryBuilder: 'Duplicar filtro',
          share: 'Compartir (copiar URL)',
          shareDisabled: 'Guardar filtro para compartir',
          setAsDefaultFilter: 'Establecer como filtro predeterminado',
          unsetDefaultFilter: 'Eliminar filtro predeterminado',
          undoChanges: 'Descartar cambios no guardados',
          noSavedFilters: 'No tienes filtros guardados',
        },
        myFiltersDropdown: {
          title: 'Mis filtros',
          manageMyFilter: 'Gestionar filtros',
          okText: 'Cerrar',
          lastSavedAt: 'Última guardado: hace {date}',
        },
        duplicateFilterTitleSuffix: 'COPIA',
      },
      query: {
        combine: {
          and: 'y',
          or: 'o',
        },
        noQuery:
          'Usa las herramientas de búsqueda y los facetes a la izquierda para crear una consulta',
      },
      actions: {
        new: 'Nuevo',
        changeOperatorTo: 'Cambiar operador a',
        addQuery: 'Nueva consulta',
        combine: 'Combinar',
        compare: 'Comparar',
        compareLessTooltips:
          'Selecciona 2 o 3 consultas para generar una comparación de diagrama de Venn',
        compareGreaterTooltips: 'Solo disponible con 2 o 3 consultas seleccionadas',
        labels: 'Etiquetas',
        delete: {
          title: '¿Eliminar esta consulta?',
          titleSelected: '¿Eliminar esta consulta?',
          cancel: 'Cancelar',
          confirm: 'Eliminar',
        },
        clear: {
          title: '¿Eliminar todas las consultas?',
          cancel: 'Cancelar',
          confirm: 'Eliminar',
          buttonTitle: 'Borrar todo',
          description: 'Estás a punto de eliminar todas tus consultas. Se perderán para siempre.',
        },
      },
    },
    savedSets: {
      modal: {
        edit: {
          title: 'Guardar este conjunto',
          okText: 'Guardar',
          cancelText: 'Cancelar',
          input: {
            label: 'Nombre del conjunto',
            placeholder: 'Conjunto sin título',
            maximumLength: 'máximo de caracteres',
          },
        },
        saveThisFilter: 'Guardar este filtro',
        add: {
          title: 'Agregar a un conjunto {type}',
          okText: 'Agregar al conjunto',
          cancelText: 'Cancelar',
        },
        remove: {
          title: 'Eliminar de un conjunto {type}',
          okText: 'Eliminar del conjunto',
          cancelText: 'Cancelar',
        },
        errors: {
          permittedCharacters: 'Caracteres permitidos: A-Z a-z 0-9 ()[]-_:|.,',
        },
      },
      popupConfirm: {
        delete: {
          title: '¿Eliminar este conjunto permanentemente?',
          okText: 'Eliminar conjunto',
          cancelText: 'Cancelar',
          content: 'Estás a punto de eliminar permanentemente este conjunto.',
        },
      },
    },
    dataRelease: {
      studies: 'Estudios',
      participants: 'Participantes',
      biospecimens: 'Biospecímenes',
      datafiles: 'Archivos de datos',
    },
    uploadIds: {
      modal: {
        title: 'Subir una lista de {entity}',
        submittedColTitle: 'Identificadores de {entity} enviados',
        uploadBtnText: 'Subir una lista de {entity}',
        mappedTo: 'Asignado a',
        collapseTitle:
          'Tabla de resumen ({matchCount} coincidentes, {unMatchCount} no coincidentes)',
        inputLabel: 'Pega una lista de identificadores o sube un archivo',
        match: 'Coincidente ({count})',
        unmatch: 'No coincidente ({count})',
        identifiers: {
          participant: 'ID de participante, ID de participante externo',
          biospecimen: 'ID de muestra, ID de muestra externo',
          file: 'ID de archivo',
        },
        placeholders: {
          participant: 'Ej. pt-005X8BR9, HTP0001',
          biospecimen: 'Ej. bs-022KAEZW, SSH3953290',
          file: 'Ej. GF_001CSF26, HTP.007855d5-e22e-405f-91f4-d54b4b8a9136.g.vcf.gz',
          sample: 'Ej. bs-022KAEZW',
        },
        tableMessage:
          '{submittedCount} identificadores enviados asignados a {mappedCount} identificadores únicos del sistema',
        matchTable: {
          idcol: '{entity} ID',
          participant: {
            matchcol: 'ID de participante',
            mappedcol: 'Estudio',
          },
          file: {
            matchcol: 'ID de archivo',
            mappedcol: 'Estudio',
          },
          biospecimen: {
            matchcol: 'ID de muestra',
            mappedcol: 'Estudio',
          },
        },
        pillTitle: 'Lista subida',
        upload: {
          fileBtn: 'Subir archivo',
          btn: 'Subir',
        },
        clearBtn: 'Borrar',
        cancelBtn: 'Cancelar',
        emptyTable: 'Sin datos',
        popover: {
          title: 'Identificadores y formatos de archivo',
          identifiers: 'Identificadores',
          separatedBy: {
            title: 'Separados por',
            values: 'coma, espacio, nueva línea',
          },
          uploadFileFormats: 'Formatos de archivo soportados',
        },
      },
    },
  },
  // LAYOUT
  layout: {
    main: {
      menu: {
        analysis: 'Análisis',
        biospecimen: 'Biospecímen',
        community: 'Comunidad',
        contact: 'Contacto',
        dashboard: 'Panel de control',
        datafiles: 'Archivos de datos',
        explore: 'Exploración de datos',
        forum: 'Foro',
        help: 'Ayuda',
        participants: 'Participantes',
        resources: 'Recursos',
        studies: 'Estudios',
        variants: 'Variantes',
        website: 'Sitio web',
      },
    },
    user: {
      menu: {
        logout: 'Cerrar sesión',
        myprofile: 'Mi perfil',
        settings: 'Configuración del perfil',
        signInWith: 'Conectado con',
      },
    },
  },
  // SCREENS
  screen: {
    memberProfile: {
      notFound: 'Usuario no encontrado',
      rolesTitle: 'Rol',
      researchAreaTitle: 'Área de investigación o área de interés',
      noRoles: 'Sin rol',
      usageTitle: 'Uso previsto de los datos del Portal INCLUDE',
      noUsage: 'Sin usos previstos',
      editProfileBtn: 'Editar perfil',
      communityBtn: 'Comunidad',
    },
    community: {
      title: 'Comunidad INCLUDE',
      resultMember: 'Miembro',
      resultsMember: 'Miembros',
      noResults: 'No hay miembros',
      search: {
        filters: 'Filtros',
        selectPlaceholder: 'Seleccionar',
        role: 'Rol',
        dataUse: 'Uso de los datos',
        clearFilters: 'Borrar filtros',
        barPlaceholder: 'Buscar por nombre de miembro o afiliación',
        sorter: {
          newest: 'Más recientes primero',
          oldest: 'Más antiguos primero',
          lastnameAlpha: 'Alfabético (apellido)',
        },
      },
      roleOptions: {
        researcher: 'Investigador en una Institución Académica o sin fines de lucro',
        representative: 'Representante de una entidad con fines de lucro o comercial',
        developer: 'Desarrollador de herramientas o algoritmos',
        clinician: 'Clínico',
        community_member: 'Miembro de la Comunidad',
        federal_employee: 'Empleado Federal',
      },
      usage: {
        learn_more_about_down_syndrome:
          'Aprender más sobre el síndrome de Down y sus resultados de salud, manejo y/o tratamiento',
        help_design_new_research_study: 'Ayudarme a diseñar un nuevo estudio de investigación',
        identifying_dataset: 'Identificar conjuntos de datos que quiero analizar',
        commercial_purpose: 'Propósitos comerciales',
      },
    },
    profileSettings: {
      title: 'Configuraciones de perfil',
      viewProfile: 'Ver perfil',
      cards: {
        deleteAccount: {
          title: 'Eliminar cuenta',
          button: 'Eliminar mi cuenta',
          notice:
            'Ya no podrás iniciar sesión en el portal de datos INCLUDE. Todos tus conjuntos y consultas guardados se perderán. Puedes crear una nueva cuenta en cualquier momento.',
          confirm: {
            content: '¿Estás seguro de que quieres eliminar permanentemente esta cuenta?',
          },
        },
        identification: {
          title: 'Identificación',
          alert:
            'Estás autenticado con <strong>{provider}</strong> utilizando <strong>{email}</strong>. Este correo electrónico nunca se muestra al público y no se puede cambiar.',
          firstName: 'Primer nombre',
          yourFirstName: 'Tu primer nombre',
          lastName: 'Apellido',
          yourLastName: 'Tu apellido',
          publicEmail: 'Correo electrónico público',
          publicEmailNotice:
            'Este correo electrónico se mostrará en tu página de perfil y será accesible para todos los usuarios registrados del portal.',
          editPhotoModalTitle: 'Editar foto',
          uploadImageError: 'No se pudo cargar tu imagen en este momento',
          removePhotoModalTitle: '¿Eliminar foto de perfil?',
          removePhotoModalButton: 'Sí, eliminar foto',
          removePhotoModalMessage:
            '¿Estás seguro de que quieres eliminar tu foto? La reemplazaremos por un avatar predeterminado.',
          uploadPhotoButton: 'Subir foto',
          removePhotoButton: 'Eliminar foto',
        },
        roleAffiliation: {
          title: 'Rol y afiliación',
          iama: 'Soy un',
          checkAllThatApply: 'Marca todo lo que corresponda',
          provideAffiliation: 'Proporciona afiliación institucional u organizacional',
          affiliatedWith: 'Estoy afiliado con',
          dontHaveAffiliation: 'No tengo afiliación institucional',
          describeResearchArea: 'Mi área de investigación o área de interés puede describirse como',
          provideABriefLink:
            'Proporciona una breve descripción y un enlace a tu biografía profesional o al sitio web de tu organización, si está disponible',
        },
        newsletter: {
          title: 'Boletín',
          consent:
            'Al suscribirte a nuestro boletín, aceptas ser agregado a nuestra lista de correo, a través de la cual recibirás actualizaciones periódicas del portal, anuncios importantes, promociones e información relevante. Puedes darte de baja en cualquier momento haciendo clic en el enlace de "cancelar suscripción" en nuestros correos electrónicos. Puedes revisar nuestra <a href="{policyLinkHref}" target="_blank" style="text-decoration: underline;">{policyLink}</a>.',
          checkbox:
            'Acepto recibir el boletín trimestral de INCLUDE Data Hub para obtener las últimas noticias.',
          policyLink: 'Política de privacidad de INCLUDE DCC',
          warning:
            'No se pudo confirmar el estado de tu suscripción. Por favor, intenta nuevamente.',
          placeholder: 'correo@dominio.com',
          error: {
            title: 'Suscripción al boletín',
            subscribeMessage:
              'Encontramos un problema al intentar suscribirte a nuestro boletín. Por favor, intenta nuevamente más tarde desde tu página de perfil o contacta con el soporte para obtener asistencia.',
            unsubscribeMessage:
              'Encontramos un problema al intentar suscribirte a nuestro boletín. Por favor, intenta nuevamente más tarde desde tu página de perfil o contacta con el soporte para obtener asistencia.',
          },
        },
        saveChanges: 'Guardar cambios',
        discardChanges: 'Descartar cambios',
      },
    },
    loginPage: {
      title: 'INCLUDE Data Hub',
      subtitle:
        'Descubre <span style="color: #7dd3fc;">nuevas perspectivas</span> sobre la biología del síndrome de Down y las condiciones que coexisten.',
      resume:
        'Accede a recursos de datos integrados a gran escala y analiza conjuntos de cohortes personalizados basados en participantes, biospecímenes, datos clínicos y genómicos.',
      login: 'Iniciar sesión',
      signup: 'Regístrate',
      viewAllBtn: 'Ver todos los estudios',
      mondoChart: {
        title: 'Condiciones co-ocurrentes más frecuentes (MONDO)',
        bottomAxis: '# de participantes',
        leftAxis: 'Diagnósticos (MONDO)',
      },
      studies: {
        title: 'Estudios',
        summary:
          'Explora una colección curada de estudios armonizados, que van desde programas informados por los participantes, cohortes financiadas por INCLUDE, iniciativas institucionales y consorcios dedicados a la investigación sobre el síndrome de Down.',
        htp: {
          name: 'The Human Trisome Project',
          description:
            '<p>The Human Trisome Project (HTP) es un estudio exhaustivo y de gran escala sobre la historia natural del síndrome de Down que involucra la recopilación de datos clínicos profundos, fenotipado multimodal, un biobanco multidimensional, generación de datos pan-ómicos y liberación rápida de datos. El HTP ha permitido muchos descubrimientos sobre la fisiopatología del síndrome de Down, lo que ha llevado a nuevos ensayos clínicos que prueban terapias para mejorar los resultados de salud diversos en esta población.</p>',
        },
        dsc: {
          name: 'DS-Connect: El Registro de Síndrome de Down',
          description:
            '<p>DS-Connect es una herramienta de encuestas en línea diseñada para recopilar datos demográficos e información básica de salud de personas con síndrome de Down (DS). Los objetivos de DS-Connect: El Registro de Síndrome de Down son entender mejor la salud de las personas con síndrome de Down e informar a los participantes elegibles que, según su historial de salud, pueden ser aptos para estudios de investigación o nuevos ensayos clínicos.</p>',
        },
        ds360hd: {
          name: 'INCLUDE: (Sherman) Análisis genómico de defectos congénitos del corazón y leucemia linfoblástica aguda en niños con síndrome de Down',
          description:
            '<p>El síndrome de Down es uno de los factores de riesgo más fuertes para la leucemia mieloide aguda en niños, lo cual está precedido por una leucemia transitoria impulsada por mutaciones somáticas en el gen GATA1. Este estudio fue financiado por los programas Kids First e INCLUDE para generar datos de secuenciación del genoma completo a partir de una colección de muestras de sangre de recién nacidos de 436 individuos con DS del Oxford Down Syndrome Cohort Study, con el fin de avanzar en la comprensión de los factores biológicos asociados con la leucemia transitoria en DS.</p>',
        },
        x01hakonarson: {
          name: 'Fundamentos genéticos del fenotipo multifactorial de pacientes con trisomía 21 desvelados por enfoques multi-ómicos',
          description:
            "<p>Para comprender mejor la fisiopatología del síndrome de Down (DS), esta propuesta generará y analizará datos de secuenciación de 777 pacientes pediátricos con DS del Children's Hospital of Philadelphia (CHOP), así como 321 madres y 148 padres. Anticipamos que la información derivada de esta cohorte profundamente fenotipada permitirá una mejor comprensión de la fisiopatología y los mecanismos moleculares subyacentes a las comorbilidades asociadas al DS, lo que podría informar sobre nuevas prácticas de tratamiento o terapias innovadoras futuras.</p>",
        },
        dspcgc: {
          name: 'INCLUDE: (PCGC) Análisis genómico de defectos congénitos del corazón y leucemia linfoblástica aguda en niños con síndrome de Down',
          description:
            '<p>Ya que un aspecto clave de Kids First es ayudar a descubrir conexiones entre defectos estructurales al nacer y cánceres infantiles, el programa se asociará con INCLUDE y TOPMed para avanzar en la comprensión de los factores biológicos que pueden conducir tanto a enfermedades cardíacas como a leucemia en personas con síndrome de Down.</p>',
        },
        bridsr: {
          name: 'Benaroya Research Institute Down Syndrome Registry',
          description:
            '<p>El registro de síndrome de Down en el Benaroya Research Institute (BRI) se basa en la experiencia institucional para recolectar y analizar muestras biológicas longitudinales y datos clínicos concomitantes a lo largo de la vida de personas con síndrome de Down. El objetivo es ayudar a avanzar en enfoques terapéuticos para predecir, prevenir y curar las condiciones asociadas al síndrome de Down.</p>',
        },
        abcds: {
          name: 'Alzheimer Biomarker Consortium - Down Syndrome',
          description:
            '<p>El objetivo del Alzheimer Biomarker Consortium-Down Syndrome (ABC-DS) es estudiar a un grupo de adultos con síndrome de Down a lo largo de sus vidas para identificar los primeros biomarcadores del inicio de la enfermedad de Alzheimer.</p>',
        },
        dscogall: {
          name: 'INCLUDE: (Lupo) Análisis genómico de defectos congénitos del corazón y leucemia linfoblástica aguda en niños con síndrome de Down',
          description:
            '<p>El síndrome de Down es uno de los factores de riesgo más fuertes para la leucemia mieloide aguda en niños, lo cual está precedido por una leucemia transitoria impulsada por mutaciones somáticas en el gen GATA1. Este estudio fue financiado por los programas Kids First e INCLUDE para generar datos de secuenciación del genoma completo a partir de una colección de muestras de sangre de recién nacidos de 436 individuos con DS del Oxford Down Syndrome Cohort Study, con el fin de avanzar en la comprensión de los factores biológicos asociados con la leucemia transitoria en DS.</p>',
        },
        x01desmith: {
          name: 'La epidemiología de la leucemia transitoria en recién nacidos con síndrome de Down',
          description:
            '<p>Los niños con síndrome de Down (DS) tienen un riesgo extremadamente alto de desarrollar leucemia mieloide aguda, y esto está precedido por una leucemia mieloide transitoria que se presenta en hasta el 30% de los recién nacidos con DS y puede llevar a la muerte temprana. En este estudio, investigaremos el papel de los factores genéticos germinales en la modificación del riesgo de leucemia mieloide transitoria en DS.</p>',
        },
        dssleep: {
          name: 'Análisis dimensional, de sueño y genómicos del síndrome de Down para dilucidar la variabilidad fenotípica',
          description:
            '<p>El trabajo actual se encuentra bajo un suplemento administrativo para estudiar el síndrome de Down (DS) dentro de la subvención existente, "Análisis dimensional de trastornos cerebrales del desarrollo utilizando un enfoque en línea, genoma primero" (R01-MH107431). El estudio tiene como objetivo construir medidas cuantitativas validadas de psicopatología para el DS.</p>',
        },
        dsnexus: {
          name: 'Nexus Translational Biobank',
          description:
            '<p>The Nexus es un registro de pacientes, base de datos clínica y banco de muestras biológicas enfocado en trastornos del desarrollo. Su objetivo principal es avanzar en la investigación al (i) vincular los fenotipos cognitivos, conductuales, neurológicos y otros fenotipos clínicos humanos con muestras biológicas, incluidos ADN, plasma y líneas celulares linfoblastoides, y (ii) facilitar el acceso a cohortes de pacientes apropiadas para fines de investigación. The Nexus es único entre los biobancos en que combina datos clínicos extensivos y muestras biológicas, y enfatiza la inclusión de datos cuantitativos cognitivos y conductuales.</p>',
        },
      },
      cards: {
        stats: {
          title: 'Liberación de datos',
          genomes: 'Genomas',
          transcriptomes: 'Transcritos',
        },
        variants: {
          title: 'Variantes germinales',
          description:
            'Nuestro explorador de variantes ofrece capacidades avanzadas de búsqueda. Con solo unos clics, puedes explorar millones de variantes germinales anotadas de los genomas de los participantes del INCLUDE Data Hub.',
          explore: 'Explorar datos de variantes',
        },
        cavatica: {
          description:
            'El portal se integra con Cavatica, una plataforma de análisis y compartición de datos diseñada para acelerar el descubrimiento en un entorno computacional basado en la nube, donde los datos, resultados y flujos de trabajo se comparten entre la comunidad investigadora mundial. Los investigadores y bioinformáticos pueden crear o utilizar flujos de trabajo existentes para analizar los conjuntos de datos de INCLUDE.',
          learnMore: 'Saber más',
        },
      },
      documentation: {
        title: 'Centro de documentación de INCLUDE',
        description:
          'Para obtener información sobre cómo acceder, enviar y cargar datos, visita nuestro Centro de Documentación.',
        button: 'Documentación',
      },
      participation: {
        title: 'Participa en el Proyecto INCLUDE',
        description:
          'Visita la página del proyecto NIH INCLUDE para obtener más información sobre la iniciativa, oportunidades de financiamiento u otros recursos.',
        button: 'Saber más',
      },
      demographic: {
        cardTitle: 'Demografía',
        downSyndromeStatusTitle: 'Estado T21',
        raceTitle: 'Raza',
        sexTitle: 'Sexo',
      },
    },
    dashboard: {
      hello: 'Hola',
      links: {
        studies: 'Estudios',
        participants: 'Participantes',
        biospecimens: 'Biospecímenes',
        datafiles: 'Archivos de Datos',
        variantSearch: 'Búsqueda de Variantes',
      },
      cards: {
        error: {
          title: 'Error de conexión',
          disconnect: {
            start:
              'Actualmente no podemos conectarnos a este servicio. Por favor, actualiza la página o',
            end: 'tu cuenta y vuelve a intentarlo. Si el problema persiste, por favor',
          },
          subtitle:
            'Actualmente no podemos conectarnos a este servicio. Por favor, actualiza la página e inténtalo de nuevo. Si el problema persiste, por favor',
          contactSupport: 'contacta con el soporte',
        },
        datarelease: {
          title: 'Liberación de datos {version}',
        },
        authorizedStudies: {
          title: 'Estudios autorizados {count, plural, =0 {} other {(#)}}',
          connectedNotice:
            'Tienes acceso a los siguientes datos controlados de INCLUDE a través de tus credenciales NIH.',
          disconnectedNotice:
            'Accede a los datos de acceso controlado de INCLUDE conectando tu cuenta utilizando tus credenciales NIH.',
          disconnect: 'Desconectar',
          noAvailableStudies: 'No hay estudios disponibles',
          authorization: 'Autorización',
          of: 'de',
          files: 'archivos',
          dataGroups: 'Grupos de uso de datos:',
          infoPopover: {
            title: 'Acceso a los datos',
            content:
              'Los usuarios que soliciten acceso a los datos controlados deben tener una cuenta eRA Commons. Lee más sobre',
            applyingForDataAccess: 'solicitar acceso a los datos',
          },
        },
        cavatica: {
          title: 'Proyectos Cavatica',
          connectedNotice: 'Estás conectado al entorno de la nube Cavatica.',
          disconnectedNotice:
            'Para analizar los datos de INCLUDE en la nube, conéctate a Cavatica.',
          disconnect: 'Desconectar',
          noProjects: 'No tienes proyectos Cavatica.',
          createNewProject: 'Crea tu primer proyecto',
          membersCount: '{count, plural, =0 {miembro} =1 {# miembro} other {# miembros}}',
          infoPopover: {
            title: 'Plataforma de cómputo en la nube CAVATICA',
            content:
              'CAVATICA es una plataforma de análisis de datos en la nube donde los datos, resultados y flujos de trabajo se comparten entre la comunidad investigadora mundial.',
            readMore: 'Leer más',
          },
          newProject: 'Nuevo proyecto',
          billingGroups: {
            label: 'Grupo de facturación del proyecto',
            empty: 'No tienes grupo de facturación de proyectos',
          },
          createProject: 'Crear proyecto',
          cancelText: 'Cancelar',
          error: {
            create: {
              title: 'No se pudo crear el proyecto',
              subtitle: 'Ha ocurrido un error y no pudimos crear tu proyecto. Intenta nuevamente o',
            },
          },
        },
        savedFilters: {
          title: 'Filtros guardados',
          noSavedFilters:
            'Un filtro guardado es una consulta virtual creada al aplicar uno o más filtros a un conjunto de datos. Guarda tu primer filtro desde el generador de consultas en la parte superior de las páginas de <a href="{dataExploHref}" style="text-decoration: underline;">Exploración de Datos</a> y <a href="{variantsHref}" style="text-decoration: underline;">Exploración de Variantes</a>.',
          lastSaved: 'Último guardado: {date} atrás',
          infoPopover: {
            content:
              'Un filtro guardado es una consulta virtual creada al aplicar uno o más filtros a un conjunto de datos. Pueden guardarse y revisarse más tarde. Puedes crear y administrar filtros guardados desde el generador de consultas en la parte superior de las páginas de <a href="{dataExploHref}" style="text-decoration: underline;">Exploración de Datos</a> y <a href="{variantsHref}" style="text-decoration: underline;">Exploración de Variantes</a>.',
            title: 'Administrar filtros guardados',
          },
          errorCard: {
            failedToFetch: 'No se pudieron obtener los filtros guardados',
            message:
              'Por favor, actualiza e intenta nuevamente o <a href="{href}" style="color:inherit;text-decoration: underline;">contacta con nuestro soporte</a>.',
          },
        },
        savedSets: {
          title: 'Conjuntos guardados',
          noSavedSets:
            'Un conjunto guardado es una colección de uno o más ID de entidad que pueden guardarse y revisarse más tarde. Guarda tu primer conjunto en la parte superior de la tabla de resultados en <a href="{dataExploHref}" style="text-decoration: underline;">Exploración de Datos</a> y <a href="{variantsHref}" style="text-decoration: underline;">Exploración de Variantes</a>.',
          lastSaved: 'Último guardado: {date} atrás',
          infoPopover: {
            content:
              'Un conjunto guardado es una colección de uno o más ID de entidad que pueden guardarse y revisarse más tarde. Puedes crear conjuntos guardados en la parte superior de la tabla de resultados en las páginas de <a href="{dataExploHref}" style="text-decoration: underline;">Exploración de Datos</a> y <a href="{variantsHref}" style="text-decoration: underline;">Exploración de Variantes</a>.',
            title: 'Administrar conjuntos guardados',
          },
          participantsTab: 'Participantes ({count})',
          biospecimensTab: 'Biospecímenes ({count})',
          filesTab: 'Archivos ({count})',
          variantsTab: 'Variantes ({count})',
          errorCard: {
            failedToFetch: 'No se pudieron obtener los conjuntos guardados',
            message:
              'Por favor, actualiza e intenta nuevamente o <a href="{href}" style="color:inherit;text-decoration: underline;">contacta con nuestro soporte</a>.',
          },
        },
        biospecimenRequest: {
          title: 'Solicitudes de biospecímenes',
          titleInfo: {
            title: 'Tu historial de solicitudes',
            text: 'Este card muestra el historial de tus solicitudes de biospecímenes. Puedes recargarlas en <a href="{href}" style="text-decoration: underline;">Exploración de Datos</a> o compartir el enlace.',
          },
          noBiospecimenRequests:
            '<p style="margin-bottom: 0;">El historial de tus solicitudes de biospecímenes se listará aquí.</p><p style="margin-bottom: 0;">Puedes hacer tu primera solicitud en <a href="{href}" style="text-decoration: underline;">Exploración de Datos</a>.</p>',
          error: {
            title: 'Error',
            text: 'Actualmente no podemos cargar este contenido. Por favor, actualiza la página e intenta de nuevo. Si el problema persiste, por favor <a href="{href}" style="text-decoration: underline;" target="_blank">contacta con soporte</a>.',
          },
          lastSaved: 'Último guardado: {date} atrás',
          popupConfirm: {
            delete: {
              title: '¿Eliminar permanentemente esta solicitud de biospecímenes?',
              content: 'Estás a punto de eliminar esta solicitud de tu historial.',
              okText: 'Eliminar',
              cancelText: 'Cancelar',
            },
          },
          editModal: {
            title: 'Guardar esta solicitud de biospecímenes',
            cancelText: 'Cancelar',
            okText: 'Guardar',
            inputLabel: 'Nombre',
            placeholder: 'Nombre de la solicitud de biospecímenes',
            requiredError: 'Debes proporcionar un nombre para esta solicitud.',
            existingNameError: 'Ya existe una solicitud de biospecímenes con este nombre',
            maximumLength: 'caracteres máximo',
          },
          shareLink: {
            success: { title: 'Éxito', description: 'Enlace copiado al portapapeles' },
            error: { title: 'Error', description: 'No se pudo copiar el enlace al portapapeles' },
          },
        },
      },
    },
    variants: {
      sidemenu: {
        participant: 'Participante',
        variant: 'Variante',
        gene: 'Gen',
        frequency: 'Frecuencia',
        pathogenicity: 'Patogenicidad',
      },
      title: 'Exploración de Variantes',
      variant: 'Variante',
      table: {
        alt: {
          title: 'ALT',
          tooltip: '# de alelos alternativos',
        },
        CADD: {
          title: 'CADD',
          tooltip: 'CADD (puntaje Phred)',
        },
        canonical: 'Ensembl Canónico',
        clinvar: 'ClinVar',
        clinvarAbrv: {
          conflicting_interpretations_of_pathogenicity: 'CI',
          benign: 'B',
          likely_benign: 'LB',
          uncertain_significance: 'VUS',
          pathogenic: 'P',
          not_provided: 'NP',
          drug_response: 'DR',
          risk_factor: 'RF',
          likely_pathogenic: 'LP',
          association: 'AS',
          other: 'O',
          affects: 'AF',
          protective: 'PV',
          confers_sensitivity: 'CS',
          uncertain_risk_allele: 'URA',
          association_not_found: 'ANF',
          likely_risk_allele: 'LRA',
          low_penetrance: 'LPN',
        },
        consequences: {
          title: 'Consecuencia Más Dañina',
          tooltip: 'Consecuencias funcionales de las variaciones genéticas anotadas usando VEP',
        },
        dbsnp: 'dbSNP',
        gene: 'Gen',
        genome_build: 'Construcción del genoma',
        gnomAD: {
          title: 'gnomAD',
          tooltip: 'gnomAD Genoma 3.1.2 (frecuencia de alelos)',
        },
        gnomADAlt: {
          title: 'gnomAD ALT',
          tooltip: 'gnomAD Genoma 3.1.2 (conteo de alelos alternativos)',
        },
        gnomAd: 'GnomAD',
        homozygotes: {
          title: 'Homo.',
          tooltip: '# de homocigotos para alelos alternativos',
        },
        inheritant: {
          code: {
            AD: 'Autosomal Dominante',
            AR: 'Autosomal Recesivo',
            DD: 'Digenico Dominante',
            DR: 'Digenico Recesivo',
            IC: 'Casos Aislados',
            Mi: 'Mitocondrial',
            Mu: 'Multifactorial',
            NRT: 'Sin Transmisión Reportada',
            SMo: 'Mosaicismo Somático',
            Smu: 'Mutación Somática',
            XL: 'Ligado al X',
            XLD: 'Ligado al X Dominante',
            XLR: 'Ligado al X Recesivo',
            YL: 'Ligado al Y',
          },
        },
        mane: 'MANE',
        manePlus: 'MANE Plus',
        maneSelect: 'MANE Select',
        mostDeleteriousConsequence: {
          title: 'Consecuencia Más Dañina',
          tooltip: 'Consecuencias funcionales de las variaciones genéticas anotadas usando VEP',
        },
        omim: {
          title: 'OMIM',
          tooltip: 'Modos de herencia MIM',
        },
        participant: {
          title: 'Part.',
          tooltip: '# de participantes afectados y frecuencia en las cohortes INCLUDE',
        },
        revel: 'REVEL',
        studies: {
          title: 'Estudios',
          tooltip: '# de estudios con participantes afectados',
        },
        type: 'Tipo',
        variant: 'Variante',
        variant_class: 'Clase de variante',
        variant_id: 'ID de variante',
      },
      summary: {
        summary: 'Resumen',
        variant: 'Variante',
        type: 'Tipo',
        cytoband: 'Cytoband',
        referenceGenome: 'Genoma de referencia',
        studies: 'Estudios',
        participants: 'Participantes',
        participantsTooltip:
          'Debido a la confidencialidad de los participantes, redirigir a la página de Exploración de Datos si el número de participantes afectados en las cohortes INCLUDE ≥ 10',
        participantTooltip:
          '# de participantes afectados y frecuencia en las cohortes INCLUDE</br></br>Debido a la confidencialidad de los participantes, redirigir a la página de Exploración de Datos solo está permitido si el número de participantes afectados es ≥ 10 para una cohorte dada',
        genes: 'Genes',
        omim: 'OMIM',
        clinVar: 'ClinVar',
        gnomadGenome311: 'gnomAD Genoma (v3.1.1)',
        gnomadGenome3: 'gnomAD Genoma (v3.1.2)',
        dbSNP: 'dbSNP',
        germline: 'Germline',
        ensembl: 'Ensembl',
        consequence: 'Consecuencia',
        gnomAD: 'gnomAD',
        gnomADTooltip: 'gnomAD Genoma 3.1.2 (frecuencia de alelos)',
        clinVarLabel: {
          affects: 'Afecta',
          association: 'Asociación',
          association_not_found: 'Asociación No Encontrada',
          benign: 'Benigna',
          confers_sensitivity: 'Confiera Sensibilidad',
          conflicting_interpretations_of_pathogenicity:
            'Interpretaciones Conflictivas de la Patogenicidad',
          drug_response: 'Respuesta a Medicamentos',
          likely_benign: 'Probablemente Benigna',
          likely_pathogenic: 'Probablemente Patogénica',
          likely_risk_allele: 'Probable Alelo de Riesgo',
          low_penetrance: 'Baja Penetrancia',
          not_provided: 'No Proporcionado',
          null: 'Sin Datos',
          other: 'Otro',
          pathogenic: 'Patogénica',
          protective: 'Protectora',
          risk_factor: 'Factor de Riesgo',
          uncertain_risk_allele: 'Alelo de Riesgo Incierto',
          uncertain_significance: 'Significado Incierto',
        },
        canonicalTooltip: 'Transcrito canónico',
        seeMore: 'Ver más',
        seeMorePopover: {
          title: 'RefSeq - {ensemblTranscriptId}',
        },
        details: {
          functionalScores: 'Puntajes Funcionales',
          geneConstraints: 'Restricciones de Genes',
          spliceAltering: 'Alteración de Splice',
          associatedConditions: 'Condiciones Asociadas (OMIM)',
          sift: 'SIFT',
          fathmm: 'FATHMM',
          caddPhred: 'CADD (Phred)',
          caddRaw: 'CADD (Raw)',
          dann: 'DANN',
          lrt: 'LRT',
          revel: 'REVEL',
          polyphen2: 'PolyPhen-2 HVAR',
          polyphen2hvar: 'PolyPhen-2 HVAR',
          phyloP17Way: 'PhyloP17Way',
          spliceAi: 'SpliceAI',
          pli: 'pLI',
          loeuf: 'LOEUF',
          spliceAiType: {
            AG: 'Ganancia Aceptora',
            AL: 'Pérdida Aceptora',
            DG: 'Ganancia Donante',
            DL: 'Pérdida Donante',
          },
          predictions: {
            fathmm_pred: {
              D: 'Deleteria',
              T: 'Tolerada',
            },
            lrt_pred: {
              D: 'Deleteria',
              N: 'Neutral',
              U: 'Desconocida',
            },
            polyphen2_hvar_pred: {
              B: 'Benigna',
              D: 'Probablemente Dañina',
              P: 'Posiblemente Dañina',
            },
            sift_pred: {
              D: 'Deleteria',
              T: 'Tolerada',
            },
          },
        },
      },
      consequences: {
        consequence: 'Consecuencia',
        impactTag: {
          modifier: 'MODIFICADOR',
          low: 'BAJA',
          moderate: 'MODERADA',
          high: 'ALTA',
        },
        impactTooltip: {
          HIGH: 'Alta',
          LOW: 'Baja',
          MODERATE: 'Moderada',
          MODIFIER: 'Modificador',
        },
        aaColumn: 'AA',
        aaColumnTooltip: 'Sustitución de aminoácido',
        cdnaChangeColumn: 'ADN codificante',
        conservationColumn: 'Conservación',
        strand: 'Cadena',
        vep: 'VEP',
        predictions: {
          prediction: 'Predicción',
          predictions: 'Predicciones',
          sift: 'Sift',
          polyphen2: 'Polyphen2',
          fathmm: 'Fathmm',
          cadd: 'Cadd',
          caddRaw: 'CaddRaw',
          caddPhred: 'CaddPhred',
          dann: 'Dann',
          lrt: 'Lrt',
          revel: 'Revel',
        },
        transcript: 'Transcrito',
        transcripts: 'Transcritos',
        refSeq: 'RefSeq',
        geneConsequence: 'Consecuencia del Gen',
        gene: 'Gen',
        geneType: 'Tipo de Gen',
        omim: 'OMIM',
        hideTranscript: 'Mostrar menos',
        showTranscript: '{count, plural, =1 {# otro transcrito} other {# otros transcritos}}',
        canonical: 'Transcrito canónico',
        gnomad: {
          pli: 'pLI',
          loeuf: 'LOEUF',
        },
        spliceAi: 'SpliceAI',
        conservation: 'Conservación',
        phyloP17Way: 'PhyloP17Way',
        pickedTooltip: 'Gen con la consecuencia más dañina',
      },
      frequencies: {
        includeStudies: 'Estudios INCLUDE',
        publicCohorts: 'Cohortes públicas',
        studies: 'Estudios',
        domain: 'Dominio',
        participants: 'Participantes',
        participantsTooltip:
          '# de participantes afectados en las cohortes INCLUDE.\n\n Debido a la confidencialidad de los participantes, redirigir a la página de Exploración de Datos solo está permitido si el número de participantes afectados es ≥ 10 para una cohorte dada',
        participantsInfoIconTooltip:
          'Debido a la confidencialidad de los participantes, los enlaces pueden devolver un número menor al mostrado',
        frequencyTooltip: 'Frecuencia de la variante en los estudios INCLUDE',
        frequency: 'Frecuencia',
        altAlleles: '# Alelos ALT',
        altAllelesTooltip: 'Número de alelos alternativos',
        homozygotes: '# Homocigotos',
        homozygotesTooltip: 'Número de variantes homocigotas',
        total: 'TOTAL',
        cohort: 'Cohorte',
        altRef: '# Alelos (ALT + REF)',
        altRefTooltip: 'Número de alelos alternativos + alelos de referencia',
      },
      pathogenicity: {
        pathogenicity: 'Patogenicidad',
        clinVar: 'ClinVar',
        genePhenotype: 'Gen - Fenotipo',
        source: 'Fuente',
        gene: 'Gen',
        condition: 'Condición',
        inheritance: 'Herencia',
        inheritances: 'Herencias',
        interpretation: 'Interpretación',
        germlineAbvr: 'GER',
        somaticAbvr: 'SOM',
        germline: 'Germline',
        somatic: 'Somática',
      },
      conditions: {
        title: 'Condición',
        tableTitle: 'Asociación Gen - Fenotipo',
      },
    },
    dataExploration: {
      title: 'Exploración de Datos',
      sidemenu: {
        participant: 'Participante',
        biospecimen: 'Biospecimen',
        datafiles: 'Archivo de Datos',
      },
      venn: {
        query: {
          title: 'Consultas Seleccionadas',
          column: 'Definición de consulta',
        },
        set: {
          title: 'Definiciones de Conjunto',
          column: 'Definición de conjunto',
          footer: 'Unión de los conjuntos seleccionados:',
          tooltips: 'Ver en exploración de datos',
          max: 'Máximo 10,000 a la vez',
        },
        save: {
          nameTemplate: 'Conjunto combinado',
          cancel: 'Cancelar',
          checkbox: {
            label: 'Guardar este conjunto para futuras referencias',
            tooltips:
              'Un conjunto guardado es una colección de uno o más ID de entidades que se puede guardar y consultar más tarde.',
          },
          label: 'Nombre del conjunto',
          alreadyExist: 'Ya existe un conjunto con este nombre',
          ok: 'Ver conjunto',
          entity: {
            participants:
              'Has seleccionado {count, plural, =0 {# participante} =1 {# participante} other {# participantes}}',
            biospecimens:
              'Has seleccionado {count, plural, =0 {# biospecimen} =1 {# biospecimen} other {# biospecimens}}',
            files:
              'Has seleccionado {count, plural, =0 {# archivo de datos} =1 {# archivo de datos} other {# archivos de datos}}',
          },
          title: 'Ver en exploración de datos',
        },
        count: 'Conteo:',
        biospecimens: 'Biospecimens',
        files: 'Archivos de Datos',
        participants: 'Participantes',
        title: 'Operaciones de conjunto',
        ok: 'Cerrar',
      },
      itemSelectionTooltip: 'Debes seleccionar al menos 1 elemento',
      setsManagementDropdown: {
        newTitle: 'Guardar conjunto {filter}',
        editTitle: 'Editar conjunto {filter}',
        create: 'Guardar como nuevo conjunto',
        add: 'Agregar a conjunto existente',
        remove: 'Eliminar de conjunto existente',
        selected: '{count, plural, =0 {# {type}} =1 {# {type}} other {# {types}} seleccionados',
        selectedTooltip:
          'Máximo {selectedLimit} elementos a la vez. Se procesarán los primeros 10,000.',
        saveSet: 'Guardar conjunto {type}',
      },
      allOf: 'Todo de',
      anyOf: 'Cualquiera de',
      noneOf: 'Ninguno de',
      hpoTree: {
        modal: {
          title: 'Navegador de Fenotipo Observado (HPO)',
          okText: 'Aplicar',
        },
        searchPlaceholder: 'Buscar término de ontología - mínimo 3 caracteres',
        emptySelection: 'Selecciona elementos del panel izquierdo para agregar a tu consulta.',
        tags: {
          exact: 'Participantes con este término exacto',
          all: 'Participantes incluyendo términos descendientes',
        },
        selectedCount:
          '{count, plural, =0 {# fenotipo único} =1 {# fenotipo único} other {# fenotipos únicos}}',
      },
      mondoTree: {
        modal: {
          title: 'Diagnóstico (MONDO) Navegador',
          okText: 'Aplicar',
        },
        searchPlaceholder: 'Buscar término de ontología - mínimo 3 caracteres',
        emptySelection: 'Selecciona elementos del panel izquierdo para agregar a tu consulta.',
        tags: {
          exact: 'Participantes con este término exacto',
          all: 'Participantes incluyendo términos descendientes',
        },
        selectedCount:
          '{count, plural, =0 {# diagnóstico único} =1 {# diagnóstico único} other {# diagnósticos únicos}}',
      },
      tabs: {
        summary: {
          title: 'Resumen',
          graphs: {
            dataCategory: {
              legendAxisLeft: 'Categorías de Datos',
              legendAxisBottom: '# de participantes',
            },
            dataTypeGraph: {
              legendAxisLeft: 'Tipos de Datos',
              legendAxisBottom: '# de participantes',
            },
            participantsByAgeGraph: {
              tooltips: 'Participantes',
              T21: 'Trisomía 21',
              D21: 'Disomía 21',
              legendAxisLeft: 'Edad en el primer contacto con el paciente (años)',
              legendAxisBottom: 'N.º de participantes',
            },
            sampleTypeGraph: {
              legendAxisLeft: 'Tipos de Muestra',
              legendAxisBottom: '# de participantes',
            },
            mostFrequentDiagnoses: {
              cardTitle: 'Diagnósticos más Frecuentes (MONDO)',
              legendAxisLeft: 'Diagnósticos (MONDO)',
              legendAxisBottom: '# de participantes',
            },
            mostFrequentPhenotypes: {
              cardTitle: 'Fenotipos más Frecuentes (HPO)',
              legendAxisLeft: 'Fenotipos (HPO)',
              legendAxisBottom: '# de participantes',
            },
          },
          download: {
            fileNameTemplate: 'include-%name-%type-%date%extension',
            fileNameDateFormat: 'yyyy-MM-dd',
            download: 'Descargar',
            preview: 'Vista previa de descarga - ',
            data: 'Descargar datos',
            svg: 'Descargar SVG',
            png: 'Descargar PNG',
          },
          demographic: {
            cardTitle: 'Demografía',
            sexTitle: 'Sexo',
            raceTitle: 'Raza',
            ethnicityTitle: 'Etnicidad',
          },
          availableData: {
            dataCategoryTitle: 'Participantes por Categoría de Datos',
            participantsByAge: 'Participantes por edad en la primera interacción con el paciente',
            dataTypeTitle: 'Participantes por Tipo de Datos',
            studiesTitle: 'Participantes por Estudio',
            sampleTypeTitle: 'Participantes por Tipo de Muestra',
            mostFrequentPhenotypes: 'Fenotipos más Frecuentes (HPO)',
            mostFrequentDiagnoses: 'Diagnósticos más Frecuentes (MONDO)',
          },
          coOccuringConditions: {
            title: 'Co-ocurrencia de las 10 Principales Condiciones',
            label: '# de participantes',
            empty: 'No hay condiciones co-ocurrentes para esta consulta',
          },
          participantsByAge: {
            cardTitle: 'Participantes por edad en la primera interacción con el paciente',
          },
          sampleType: {
            cardTitle: 'Tipo de Muestra',
          },
          sampleAvailability: {
            cardTitle: 'Disponibilidad de Muestras',
          },
          downSyndromeStatus: {
            cardTitle: 'Estado de Síndrome de Down',
          },
          observed_phenotype: {
            cardTitle: 'Fenotipos Observados (HPO)',
            legendAxisLeft: 'Fenotipos (HPO)',
            legendAxisBottom: '# de participantes',
            phenotypeTree: {
              nbParticipant:
                '{count} participantes (incluyendo términos descendientes en este camino)',
              addTermToQuery: 'Agregar término a consulta activa',
              currentPath: 'Camino actual',
            },
            empty: 'No se han reportado fenotipos observados para estos participantes',
          },
          mondo: {
            cardTitle: 'Diagnóstico (MONDO)',
            legendAxisLeft: 'Diagnósticos (MONDO)',
            legendAxisBottom: '# de participantes',
            phenotypeTree: {
              nbParticipant:
                '{count} participantes (incluyendo términos descendientes en este camino)',
              addTermToQuery: 'Agregar término a consulta activa',
              currentPath: 'Camino actual',
            },
            empty: 'No se han reportado diagnósticos para estos participantes',
          },
          studies: {
            cardTitle: 'Estudios',
          },
        },
        participants: {
          title: 'Participantes ({count})',
        },
        biospecimens: {
          title: 'Biospecimen ({count})',
          request: {
            buttonLabel: 'Solicitar biospecimen',
            modal: {
              title: 'Solicitar biospecimen',
              okText: 'Descargar manifiesto',
              cancelText: 'Cancelar',
              closeText: 'Cerrar',
              description:
                'Estás a punto de descargar el manifiesto y los documentos de apoyo necesarios para solicitar el biospecimen seleccionado. El informe incluirá información sobre las muestras disponibles de tu selección.',
              nameForm: {
                title: 'Proporciona un nombre para tu solicitud',
                note: 'Esta solicitud se guardará en tu panel de control para referencia futura.',
                placeholder: 'Nombre de la solicitud de biospecimen',
                requiredError: 'Debes proporcionar un nombre para esta solicitud.',
                existingNameError: 'Ya existe una solicitud de biospecimen con este nombre',
                maximumLength: 'máximo de caracteres',
              },
              table: {
                studyCode: 'Nombre del Estudio',
                nbParticipants: 'Participantes',
                nbAvailableSamples: 'Muestras Disponibles',
                nbAvailableSamplesTooltip:
                  'Muestras de biobanco disponibles para compartir a través del Biorepositorio Virtual basadas en tu selección de biospecimen.',
                nbContainers: 'Contenedores',
              },
              alert: {
                errorMessage: 'No se puede procesar tu solicitud',
                errorDescription:
                  'Ha ocurrido un error y no pudimos recuperar los datos para tu solicitud. Por favor, cancela e intenta de nuevo.',
                infoMessage: 'No hay muestras disponibles',
                infoDescription:
                  'No hay muestras de biospecimen disponibles para tu selección. Por favor, haz una selección diferente e intenta nuevamente.',
                limitMessage: 'Se ha superado el número máximo',
                limitDescription:
                  'Se puede incluir un máximo de 10,000 biospecimens a la vez. Por favor, reduce tu selección e intenta nuevamente.',
              },
            },
          },
        },
        datafiles: {
          title: 'Archivos de Datos ({count})',
          cavatica: {
            analyseInCavatica: 'Analizar en Cavatica',
            maxFileReached: {
              title: 'Número máximo superado',
              description:
                'Se puede copiar un máximo de 10,000 elementos a la vez. Por favor, reduce tu selección e intenta nuevamente.',
              okText: 'Cerrar',
            },
            bulkImportLimit: {
              title: 'Número máximo de archivos superado',
              description:
                'Puedes copiar un máximo de <strong>{limit} archivos</strong> a la vez. Por favor, selecciona menos archivos e intenta nuevamente.',
            },
            authWarning: {
              title: 'Conectar a Cavatica',
              description:
                'Para analizar tus archivos, primero debes conectar tu cuenta de Cavatica. Una vez que estés conectado, serás redirigido de vuelta a esta página.',
              connect: 'Conectar',
              cancel: 'Cancelar',
            },
            analyseModal: {
              title: 'Analizar en Cavatica',
              newProject: 'Nuevo proyecto',
              copyFiles: 'Copiar archivos',
              copyFilesTo: 'Copiar archivos a...',
              createProjectToPushFileTo: 'Crear un proyecto para subir tus archivos.',
              youAreAuthorizedToCopy: 'Estás autorizado para copiar',
              disabledButtonTooltip: 'Debes seleccionar al menos 1 elemento',
            },
          },
          undeterminedAuthorization: {
            popoverTitle: 'Autorización Indeterminada',
            popoverContent:
              'No podemos determinar el estado de autorización de estos archivos. Dependiendo de tu estado de autorización en dbGaP, los archivos en este conjunto pueden o no estar accesibles en tu proyecto Cavatica. Lee más sobre <a href="{href}" style="color:#0369a1;text-decoration-line:underline;" target="_blank">solicitar acceso a datos</a>.',
          },
        },
      },
    },
    studies: {
      end: 'Fin',
      harmonizedPopover: {
        title: 'Datos Armonizados',
        content:
          "<p>Datos del estudio armonizados con los estándares clínicos del INCLUDE Data Hub para facilitar la integración y comparación entre estudios.</p><p>Los estudios etiquetados con un '<strong>G</strong>' están utilizando GUIDs de NDAR, algunos de los cuales han sido enviados al INCLUDE DCC e incluidos en el archivo de mapeo de GUIDs de INCLUDE.</p>",
      },
      ndaGuids: {
        button: 'GUIDs de NDA para la investigación sobre el síndrome de Down',
        buttonTooltip:
          'Accede al archivo de mapeo de GUIDs de INCLUDE para vincular datos de participantes que puedan solaparse entre estudios de INCLUDE.',
        modal: {
          title: 'GUIDs de NDA para la investigación sobre el síndrome de Down',
          close: 'Cerrar',
          firstText:
            'El INCLUDE DCC y los NIH han implementado los <a target="_blank" href="https://nda.nih.gov/nda/using-the-nda-guid" style="text-decoration: underline;">Identificadores Únicos Globales del Archivo de Datos del NIMH</a> (NDA GUIDs) en el INCLUDE Data Hub. Los NDA GUIDs permiten a los investigadores aprobados vincular datos de un solo participante, sin revelar información personal identificable, incluso si los datos fueron recolectados a través de diferentes estudios de INCLUDE.',
          secondText:
            'El estudio dbGaP <a target="_blank" href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs003678.v1.p1" style="text-decoration: underline;">INCLUDE Data Hub: NDA GUIDs para la Investigación sobre el Síndrome de Down</a> permite a los investigadores acceder a un <strong>archivo de mapeo de GUIDs de INCLUDE</strong> que incluye todos los NDA GUIDs disponibles y sus asociaciones con los IDs de los Participantes específicos de los estudios dentro del INCLUDE Data Hub.',
          thirdTextStart:
            'Solo los estudios que proporcionan NDA GUIDs al INCLUDE DCC están incluidos en el archivo de mapeo de GUIDs de INCLUDE. Los estudios de INCLUDE con GUIDs de participantes están identificados con la etiqueta <strong>G</strong> en el ',
          thirdTextLink: 'Repositorio de Estudios',
          steps: 'Hay dos pasos para acceder al archivo de mapeo de GUIDs:',
          step1: {
            title: 'Paso 1:',
            message: 'Envía una solicitud de acceso a datos a este estudio dbGaP.',
            buttonLabel: 'Solicitar acceso al archivo de mapeo de GUIDs',
          },
          step2: {
            title: 'Paso 2:',
            message:
              'Una vez que se hayan otorgado los permisos, regresa a este modal y copia el archivo de mapeo de GUIDs en tu proyecto Cavatica. Si no tienes la aprobación de dbGaP, no podrás acceder al archivo en Cavatica. Aprende más sobre <a target="_blank" href="https://help.includedcc.org/docs/connecting-platforms-1#connecting-to-cavatica" style="text-decoration: underline;">conectar a Cavatica</a>.',
            buttonLabel: 'Copiar archivo de mapeo de GUIDs',
          },
        },
        cavaticaModal: {
          title: 'Cavatica - Archivo de mapeo de GUIDs de INCLUDE',
          okText: 'Copiar archivo',
          message:
            'Copia el archivo de mapeo de GUIDs de INCLUDE en tu proyecto Cavatica. Una vez que esté en tu proyecto, podrás descargar el archivo o incluirlo en tus flujos de trabajo.',
          selectFooterButton: 'Nuevo proyecto',
          selectPlaceholder: 'Selecciona un proyecto',
          createProjectToPushFileTo: 'Crea un proyecto para subir tus archivos.',
        },
      },
      searchLabel: {
        title: 'Buscar por código de estudio, nombre del estudio, dbGaP',
        placeholder: 'HTP, El Proyecto Humano de Trisomía, phs001138',
      },
      start: 'Inicio',
      title: 'Estudios',
    },
    publicStudies: {
      title: 'Estudios',
      search: {
        title: 'Buscar por nombre de estudio',
        placeholder: 'El Proyecto Humano de Trisomía',
      },
      loginModal: {
        title: 'INCLUDE Data Hub',
        subtitleStart: 'Descubre ',
        subtitleBlue: 'nuevas perspectivas',
        subtitleEnd: ' sobre la biología del síndrome de Down y condiciones asociadas.',
        text: 'Accede a recursos de datos integrados a gran escala y analiza conjuntos de datos de cohortes personalizados basados en participantes, biospecímenes, datos clínicos y genómicos.',
        login: 'Iniciar sesión',
        signup: 'Registrarse',
        close: 'Cerrar',
      },
    },
    analytics: {
      title: 'Análisis de Datos',
      subtitle:
        'Visualiza e interpreta rápidamente los datos de INCLUDE con nuestras herramientas fáciles de usar.',
      widget: {
        demo: 'Demostración',
        launch: 'Iniciar',
      },
      newsletter: {
        title: '¡Nuevas Herramientas de Análisis Pronto Disponibles!',
        description:
          'Únete a nuestra lista de correo para recibir actualizaciones y ser uno de los primeros en probar nuestras próximas herramientas.',
        form: {
          placeholder: 'email@ejemplo.com',
          buttonLabel: 'Recibir actualizaciones',
        },
      },
      transcriptomic: {
        title: 'Expresión Génica Diferencial HTP',
        description:
          'Visualiza las diferencias en la expresión génica entre muestras con trisomía 21 y las que no la tienen.',
        tags: {
          transcriptomics: 'Transcriptómica',
          gene: 'Gen',
        },
        empty: 'Selecciona un gen para comparar efectos',
        subtitle:
          'Explora el impacto de la trisomía 21 sobre la expresión génica entre personas con y sin síndrome de Down. Generado mediante secuenciación de ARN PAXgene Whole Blood RNA.',
        scatterPlot: {
          title: 'Efecto del Cariotipo en Todos los Genes',
          gene_symbol: 'Gen',
          ensembl_gene_id: 'ID de Ensembl',
          fold_change: 'Cambio en pliegue',
          qvalue: 'Valor q',
          not_significant: 'No significativo',
          up_regulated: 'Regulado al alza ({threshold})',
          down_regulated: 'Regulado a la baja ({threshold})',
          xAxisTitle: 'log2 (Cambio en pliegue)',
          yAxisTitle: '-log10 (valor q)',
        },
        heatmap: {
          title: 'Cambio en Pliegue con T21',
          fold_change: 'Cambio en pliegue',
          qvalue: 'Valor q',
          gene_symbol: 'Símbolo del gen',
        },
        filter: {
          genes: {
            emptyText: 'Ningún gen encontrado',
            placeholder: 'por ejemplo, BRAF, ENSG00000157764',
            title: 'Buscar por gen',
            tooltip: 'Ingresa un Símbolo de Gen o ID de Ensembl',
            fdr: 'Umbral FDR',
            identifiers: 'Símbolo del Gen, ID de Ensembl',
            mappedCol: 'Símbolo del Gen',
          },
          samples: {
            emptyText: 'Ninguna muestra encontrada',
            placeholder: 'por ejemplo, bs-z8p7wjm7',
            title: 'Buscar por muestra',
            tooltip: 'Ingresa un ID de muestra',
            fpkm: 'FPKM',
            age_at_biospecimen: 'Edad en la colección de biospecímenes',
            age_at_biospecimen_tooltips: 'Edad en la colección de biospecímenes (años)',
            sex: 'Sexo',
            female: 'Femenino',
            male: 'Masculino',
            unknown: 'Desconocido',
          },
        },
        footer: {
          download: 'Descargar datos',
          notification:
            'Por favor, espera mientras generamos tu informe. Este proceso puede tardar unos momentos.',
          diffGeneTooltip: 'Descargar expresión génica diferencial a través de todos los genes',
          sampleTooltip: 'Descargar datos de expresión génica a través de todos los genes',
        },
        about: {
          title: 'Acerca de este conjunto de datos',
          description:
            'Explora el impacto de la trisomía 21 sobre la expresión génica entre personas con y sin síndrome de Down. Generado mediante secuenciación de ARN PAXgene Whole Blood RNA.',
          subtitle: 'Metadatos Experimentales',
          close: 'Cerrar',
        },
        swarmPlot: {
          title: 'Efecto del Cariotipo en {symbol}',
          sample_id: 'ID de muestra',
          fpkm: 'FPKM',
          t21: 'T21 {nT21}',
          control: 'Control {nControl}',
        },
        sidebar: {
          statisticalParameters: 'Parámetros Estadísticos',
          statisticalCorrection: 'Corrección Estadística',
          statisticalTest: 'Método Estadístico',
          deseq2: 'DESeq2',
          bhfdr: 'BH FDR',
          location: 'Ubicación',
          chromosome: 'Cromosoma',
        },
        dataset: {
          label: 'Conjunto de Datos',
          about: 'Acerca de este conjunto de datos',
          datasetValue: 'HTP Whole Blood RNAseq (2020)',
          aboutContent:
            'HTP Whole Blood RNAseq (v1) es un conjunto de datos generado como parte del Proyecto Humano de Trisomía (HTP), que se centra en las características genéticas y moleculares de individuos con condiciones trisómicas, incluido el síndrome de Down. Este conjunto de datos consiste en datos de secuenciación de ARN (RNAseq) derivados de muestras de sangre entera, capturando perfiles transcriptómicos de alta capacidad (HTP). La primera versión (v1) incluye datos de expresión génica basal, con un enfoque en la comprensión de la expresión génica diferencial, el empalme alternativo y el análisis de vías entre muestras. Se utiliza para estudios comparativos entre poblaciones trisómicas y euploides para identificar posibles biomarcadores y objetivos terapéuticos.',
        },
      },
    },
    participantEntity: {
      personPopover: {
        title: 'Individuo en Estudios Múltiples',
        content1:
          'Existen múltiples registros de participantes para este individuo en diferentes estudios. Estos participantes operan dentro del mismo marco de investigación, lo que permite su vinculación. ',
        content2: 'Ver todos los registros de participantes de este individuo.',
        content3:
          'Tenga en cuenta que puede haber participantes adicionales en estudios cruzados, pero se requiere acceso al archivo de mapeo GUID para su identificación. Los estudios INCLUDE con GUID de participantes se identifican con la etiqueta <strong>G</strong> en el <a href="{studiesHref}" style="text-decoration: underline;">Repositorio de Estudios</a>.',
      },
    },
  },
  facets: {
    program: 'Programa',
    biospecimen_storage: 'Almacenamiento de Muestras Biológicas',
    laboratory_procedure: 'Procedimiento de Laboratorio',
    parent_sample_type: 'Tipo de Muestra Principal',

    // Participante
    participant_id: 'ID del Participante',
    participant_facet_ids: {
      participant_fhir_id_1: 'ID del Participante',
      participant_fhir_id_2: 'ID del Participante',
    },
    file_facet_ids: {
      file_fhir_id_1: 'ID del Archivo',
      file_fhir_id_2: 'ID del Archivo',
    },
    biospecimen_facet_ids: {
      biospecimen_fhir_id_1: 'ID de la Muestra',
      biospecimen_fhir_id_2: 'ID de la Muestra',
    },
    biospecimen_id: 'Muestra Biológica',
    study: {
      study_code: 'Código del Estudio',
      study_name: 'Nombre del Estudio',
      external_id: 'Número de Acceso dbGaP',
    },
    studies: {
      study_code: 'Código del Estudio',
      transmission: 'Transmisión',
      zygosity: 'Cigocidad',
    },
    is_proband: 'Proband',
    study_id: 'Código del Estudio',
    down_syndrome_status: 'Estado de Síndrome de Down',
    down_syndrome_diagnosis: 'Diagnóstico de Síndrome de Down',
    mondo: {
      name: 'Diagnóstico (MONDO)',
    },
    diagnosis: {
      affected_status: 'Estado Clínico',
      mondo_display_term: 'Diagnóstico (MONDO)',
      ncit_id_diagnosis: 'Edad al Diagnóstico (días)',
      age_at_event_days: 'Edad al Diagnóstico (días)',
      source_text: 'Condición (Texto Fuente)',
      source_text_tumor_location: 'Ubicación del Tumor (Texto Fuente)',
    },
    outcomes: {
      age_at_event_days: {
        value: 'Edad al Estado Vital (días)',
      },
      vital_status: 'Estado Vital',
    },
    phenotype: {
      hpo_phenotype_observed: 'Fenotipo Observado (HPO)',
      hpo_phenotype_not_observed: 'Fenotipo No Observado (HPO)',
      age_at_event_days: 'Edad al Fenotipo Observado (días)',
    },
    age_at_data_collection: 'Edad al momento de recolección de datos',
    age_at_first_patient_engagement: { value: 'Edad al Primer Contacto con el Paciente (días)' },
    family_type: 'Unidad Familiar',
    family_data: 'Datos familiares',
    family: {
      family_id: 'ID de la Familia',
    },
    sex: 'Sexo',
    ethnicity: 'Etnicidad',
    race: 'Raza',
    observed_phenotype: {
      name: 'Fenotipo (HPO)',
      age_at_event_days: 'Edad al Fenotipo Observado (días)',
    },
    options: {
      D21: 'Disomía 21, euploide',
      T21: 'Trisomía 21',
    },
    person: {
      person_id: 'ID de Persona',
    },

    // Muestras biológicas
    biospecimen_type: 'Tipo de Muestra Biológica',
    sample_type: 'Tipo de Muestra',
    derived_sample_type: 'Tipo de Muestra Derivada',
    ncit_id_tissue_type: 'Tipo de Tejido (NCIT)',
    status: 'Disponibilidad',
    age_at_biospecimen_collection:
      'Edad al momento de la recolección de la muestra biológica (días)',
    bio_repository: 'Biobanco',
    collection_sample_id: 'ID de la Colección',
    sample_id: 'ID de la Muestra',

    // Archivos
    files: filesFacets,
    ...filesFacets,
    dataset_names: 'Conjunto de Datos',

    // Otro
    collection_sample_type: 'Tipo de Muestra de la Colección',

    // Variantes
    variant_class: 'Tipo de Variante',
    type: 'Tipo',
    chromosome: 'Cromosoma',
    position: 'Posición',
    zygosity: 'Cigocidad',
    transmissions: 'Transmisión',
    genePanels: 'Paneles de Genes',
    start: 'Posición',
    locus: 'ID de la Variante',
    variant_external_reference: 'Referencia Externa de la Variante',
    gene_external_reference: 'Referencia Externa del Gen',
    consequences: {
      consequences: 'Consecuencia',
      biotype: 'Tipo de Gen',
      vep_impact: 'VEP',
      symbol: 'Símbolo del Gen',
      symbol_id_1: 'Genes',
      predictions: {
        sift_pred: 'SIFT',
        polyphen2_hvar_pred: 'PolyPhen-2 HVAR',
        fathmm_pred: 'FATHMM',
        cadd_rankscore: 'CADD',
        lrt_pred: 'LRT',
        revel_rankscore: 'REVEL',
        dann_rankscore: 'DANN',
      },
    },
    genes: {
      consequences: {
        consequence: 'Consecuencia',
        vep_impact: 'VEP',
        predictions: {
          cadd_score: 'CADD (Bruto)',
          cadd_phred: 'CADD (Phred)',
          dann_score: 'DANN',
          fathmm_pred: 'FATHMM',
          lrt_pred: 'LRT',
          polyphen2_hvar_pred: 'PolyPhen-2 HVAR',
          revel_score: 'REVEL',
          sift_pred: 'SIFT',
        },
      },
      biotype: 'Tipo de Gen',
      gnomad: {
        pli: 'gnomAD pLI',
        loeuf: 'gnomAD LOEUF',
      },
      spliceai: {
        ds: 'SpliceAI',
      },
      hpo: {
        hpo_term_label: 'HPO',
      },
      orphanet: {
        panel: 'ORPHANET',
      },
      omim: {
        name: 'OMIM',
      },
      ddd: {
        disease_name: 'DDD',
      },
      cosmic: {
        tumour_types_germline: 'COSMIC',
      },
    },
    clinvar: {
      clin_sig: 'ClinVar',
    },
    external_frequencies: {
      gnomad_genomes_2_1_1: {
        af: 'gnomAD Genoma 2.1.1',
      },
      gnomad_genomes_3: {
        af: 'gnomAD Genoma 3.1.2',
      },
      gnomad_exomes_2_1_1: {
        af: 'gnomAD Exoma 2.1.1',
      },
      topmed_bravo: {
        af: 'TopMed',
      },
      thousand_genomes: {
        af: '1000 Genomas',
      },
    },
    internal_frequencies: {
      total: {
        af: 'Frecuencia Alélica (INCLUDE)',
      },
    },
    frequencies: {
      internal: {
        upper_bound_kf: { af: 'Frecuencia Alélica KF' },
      },
      gnomad_genomes_2_1: {
        af: 'gnomAD Genoma 2.1',
      },
      gnomad_genomes_3_0: {
        af: 'gnomAD Genoma 3.0',
      },
      gnomad_genomes_3_1_1: {
        af: 'gnomAD Genoma 3.1',
      },
      gnomad_exomes_2_1: {
        af: 'gnomAD Exoma 2.1',
      },
      topmed: {
        af: 'TopMed',
      },
      one_thousand_genomes: {
        af: '1000 Genomas',
      },
    },

    // Estudios
    domain: 'Dominio',
    population: 'Población',
    donors: {
      diagnoses: {
        tagged_icd: {
          main_category: 'Tipo de Enfermedad (CIE-10)',
        },
        tagged_mondo: {
          main_category: 'Diagnóstico (MONDO)',
        },
      },
      observed_phenotype_tagged: {
        main_category: 'Tipo de Anormalidad Fenotípica (HPO)',
      },
    },
    study_design: 'Diseño',
    part_lifespan_stages: 'Etapa de Vida del Participante',
    is_harmonized: 'Datos Armonizados',
    is_guid_mapped: 'GUID Disponible',
    data_sources: 'Fuente de Datos',
    tooltips: {
      genes: {
        consequences: {
          vep_impact: 'Predictor de Efecto de Variante de Ensembl',
          predictions: {
            cadd_score: 'Depleción Dependiente de Anotación Combinada',
            cadd_phred: 'CADD PHRED',
            dann_score: 'Anotación Deleteria con Redes Neuronales',
            fathmm_pred: 'Análisis Funcional con Modelos Ocultos de Markov',
            lrt_pred: 'Prueba de Razón de Verosimilitudes',
            polyphen2_hvar_pred: 'Polimorfismo Fenotípico v2 HumVar',
            revel_score: 'Aprendizaje Ensamblado de Variantes Exómicas Raras',
            sift_pred: 'Clasificación de Intolerantes desde Tolerantes',
          },
        },
        hpo: {
          hpo_term_label: 'Ontología de Fenotipo Humano',
        },
        orphanet: {
          panel: 'ORPHANET',
        },
        omim: {
          name: 'Herencia Mendeliana en Línea del Hombre',
        },
        ddd: {
          disease_name: 'Desentrañando Trastornos del Desarrollo',
        },
        cosmic: {
          tumour_types_germline: 'Catálogo de Mutaciones Somáticas en Cáncer',
        },
        spliceai: {
          ds: 'NUEVO',
        },
        gnomad: {
          pli: 'NUEVO',
          loeuf: 'NUEVO',
        },
      },
    },
  },

  entities: {
    global: {
      id: 'ID',
      summary: 'Resumen',
    },
    biospecimen: {
      age: 'Edad',
      age_tooltip: 'Edad en la recolección del biospecimen',
      biospecimen: 'Biospecimen',
      biospecimens: 'Biospecímenes',
      biospecimen_storage: 'Almacenamiento de biospecímenes',
      collection_id: 'ID de recolección',
      collection_sample_type: 'Tipo de muestra de recolección',
      container_id: 'ID de contenedor',
      count: '{count, plural, =0 {Biospecimen} =1 {Biospecimen} other {Biospecímenes}}',
      external_sample_id: 'ID de muestra externa',
      laboratory_procedure: 'Procedimiento de laboratorio',
      parent_sample_id: 'ID de muestra principal',
      parent_sample_type: 'Tipo de muestra principal',
      sample_availabilty: 'Disponibilidad de muestra',
      sample_id: 'ID de muestra',
      sample_type: 'Tipo de muestra',
      volume: 'Volumen',
      volume_unit: 'Unidad de volumen',
    },
    file: {
      controlled: 'Controlado',
      registered: 'Registrado',
      fileAuthorization: 'Autorización de archivo',
      access: 'Acceso',
      access_url: 'URL de acceso',
      apply_data_access: 'solicitando acceso a los datos',
      biospecimens: 'Biospecímenes',
      category: 'Categoría',
      count: '{count, plural, =0 {Archivo} =1 {Archivo} other {Archivos}}',
      data_access: 'Acceso a los datos',
      data_category: 'Categoría de datos',
      data_category_count: 'Conteo de archivos por categoría de datos',
      data_type: 'Tipo de datos',
      dbgap_accession_number: 'Número de acceso dbGaP',
      experimental_strategy: 'Estrategia experimental',
      experimental_strategy_count: 'Conteo de archivos por estrategia experimental',
      file: 'Archivo de datos',
      file_id: 'ID de archivo',
      file_id_full: 'ID de archivo completo',
      file_name: 'Nombre de archivo',
      file_name_full: 'Nombre completo de archivo',
      files: 'Archivos',
      format: 'Formato',
      hash: 'Hash',
      locked:
        'No está autorizado para acceder a este archivo. Los usuarios que solicitan acceso a datos controlados necesitan una cuenta de eRA Commons y permisos de un Comité de Acceso a Datos asociado. Lea más en ',
      manifest: 'Manifiesto',
      'n=2': '(n={count})',
      nTooltipFile: 'Número total de archivos en el estudio',
      participants: 'Participantes',
      participant_sample: 'Participante / Muestra',
      size: 'Tamaño',
      type: 'Tipo',
      unlocked:
        'Está autorizado para acceder y copiar este archivo a su espacio de trabajo Cavatica.',
      url: 'URL',
    },
    participant: {
      age: 'Edad',
      age_at_first_patient_engagement: 'Edad',
      age_at_first_patient_engagement_complete: 'Edad en el primer contacto con el paciente',
      age_at_first_patient_engagement_tooltip: 'Edad en el primer contacto con el paciente',
      age_tooltip_diagnosis: 'Edad en el diagnóstico',
      age_tooltip_phenotype: 'Edad en el fenotipo',
      biospecimens: 'Biospecímenes',
      count: '{count, plural, =0 {Participante} =1 {Participante} other {Participantes}}',
      dbgap: 'dbGaP',
      diagnosis: 'Diagnóstico',
      disomy: 'D21: "Disomía 21, euploide"',
      down_syndrome_status: 'Estado de síndrome de Down',
      down_syndrome_status_abvr: 'Estado DS',
      down_syndrome_status_tooltip: 'Estado de síndrome de Down',
      duo: 'Dúo',
      ethnicity: 'Etnicidad',
      external_id: 'ID del participante externo',
      external_id_full: 'ID completo del participante externo',
      external_id_tooltip: 'ID completo del participante externo',
      families: 'Familias',
      family: 'Familia',
      family_id: 'ID de familia',
      family_relationship: 'Relación familiar',
      family_unit: 'Unidad familiar',
      files: 'Archivos',
      hpo_term: 'Término HPO',
      hpo_term_tooltip: '# de participantes con este término HPO exacto',
      measurement: {
        title: 'Medición',
        type: 'Tipo',
        loinc: 'LOINC',
        value: 'Valor',
        unit: 'Unidad',
        age: 'Edad',
        age_tooltip: 'Edad en la medición',
      },
      mondo_diagnosis: 'Diagnóstico (MONDO)',
      mondo_term: 'Término MONDO',
      mondo_term_tooltip: '# de participantes con este término MONDO exacto',
      other: 'Otro',
      participants: 'Participantes',
      participant_id: 'ID de participante',
      person_id: 'ID de persona',
      phenotype: 'Fenotipo',
      phenotype_hpo: 'Fenotipo (HPO)',
      'proband-only': 'Solo probando',
      profile: 'Perfil',
      race: 'Raza',
      sex: 'Sexo',
      source_text: 'Condición (Texto fuente)',
      trio: 'Trío',
      'trio+': 'Trío+',
      trisomy: 'T21: "Trisomía 21"',
    },
    study: {
      studies: 'Estudios',
      access_limitation: 'Limitación de acceso',
      access_requirement: 'Requisito de acceso',
      affectedStudies: {
        message:
          'El acceso al conjunto completo de datos de ABC-DS, incluidos los datos clínicos, cognitivos, neuroimagen y genéticos, debe solicitarse a ABC-DS mediante este <a href="{href}" style="color:inherit;text-decoration-line:underline;" target="_blank" rel="noopener noreferrer">formulario de solicitud de datos</a>.',
        title: 'Acceso al estudio',
      },
      acknowledgement: 'Reconocimiento',
      citation_statement: 'Declaración de citación',
      code: 'Código',
      count: '{count, plural, =0 {Estudio} =1 {Estudio} other {Estudios}}',
      dataset: {
        access_limitations: 'Limitaciones de acceso',
        access_requirements: 'Requisitos de acceso',
        cavatica: {
          button: 'Analizar en Cavatica',
          modal: {
            title: 'Cavatica - Archivos no armonizados de DS-Connect',
            okText: 'Copiar archivos',
            message:
              'Copie los archivos no armonizados de DS-Connect a su proyecto Cavatica. Una vez esté en su proyecto, podrá descargar el archivo o incluirlo en sus flujos de trabajo.',
            selectFooterButton: 'Nuevo proyecto',
            selectPlaceholder: 'Seleccionar un proyecto',
            createProjectToPushFileTo: 'Crear un proyecto para subir sus archivos.',
          },
        },
        data_categories: 'Categoría de datos',
        data_collection_start_year: 'Inicio de la recolección de datos (Año)',
        data_collection_end_year: 'Fin de la recolección de datos (Año)',
        data_type: 'Tipo de datos',
        dbgap: 'Número de acceso dbGaP',
        description: 'Descripción',
        doi: {
          label: 'DOI',
          copyMessage: 'URL DOI copiada al portapapeles',
          copyTooltip: 'Copiar URL DOI',
        },
        experimental_platform: 'Plataforma experimental',
        experimental_strategy: 'Estrategia experimental',
        external_dataset_id: 'ID del conjunto de datos',
        infoTootlip:
          'Los conjuntos de datos son subconjuntos de los datos del estudio designados para capturar información específica que no aplica a todo el conjunto de datos del estudio.',
        publication: 'Publicación',
        title: 'Conjunto de datos',
      },
      data_access: 'Acceso a los datos',
      dataCategory: {
        genomic: 'Gen.',
        genomicTooltip: 'Genómica',
        immuneMap: 'Mapa inmune',
        immuneMapTooltip: 'Mapa inmune',
        metabolomic: 'Meta.',
        metabolomicTooltip: 'Metabolómica',
        proteomic: 'Prot.',
        proteomicTooltip: 'Proteómica',
        transcriptomic: 'Trans.',
        transcriptomicTooltip: 'Transcriptómica',
      },
      data_sources: 'Tipo de fuente de datos clínicos',
      data_source_table: 'Fuente de datos',
      date_collection_end: 'Fin de la recolección de datos (Año)',
      date_collection_end_year: 'Año de fin de recolección',
      date_collection_start: 'Inicio de la recolección de datos (Año)',
      date_collection_start_year: 'Año de inicio de recolección',
      dbGaP: 'Número de acceso dbGaP',
      dbgap: 'dbGaP',
      description: 'Descripción',
      doi: {
        citation: 'Citación DOI',
        copyMessage: 'Citación DOI copiada al portapapeles',
        copyTooltip: 'Copiar citación DOI',
      },
      domain: 'Dominio de investigación',
      domains: 'Dominio',
      expected_data_categories: 'Categoría de datos',
      file: 'Archivo',
      files: 'Archivos',
      guid: 'GUID disponible',
      guidAbrv: 'G',
      guidTooltip: 'GUID de NDA',
      guidEntityTooltip1:
        'Los estudios que proporcionan GUID de NDA al INCLUDE DCC están incluidos en el archivo de mapeo de GUID de INCLUDE. Más información se puede encontrar en ',
      guidEntityTooltip2: 'Repositorio de estudio',
      harmonized: 'Armonizado',
      harmonizedAbrv: 'A',
      harmonizedTooltip:
        'Datos armonizados indican que un subconjunto de datos crudos proporcionados por un estudio ha sido normalizado al modelo de datos de INCLUDE para que se pueda hacer una comparación válida entre estos estudios.',
      institution: 'Institución',
      name: 'Nombre',
      numberByDataTypes: 'Conteo de archivos por tipo de datos',
      numberByExperimentalStrategy: 'Conteo de archivos por estrategia experimental',
      participant_life_span: 'Esperanza de vida del participante',
      population: 'Población',
      principal_investigator: 'Investigador principal',
      program: 'Programa',
      publication: 'Publicación',
      publicationDetails: {
        authors: 'et al.',
        copyMessage: 'Citación copiada al portapapeles',
        copyTooltip: 'Copiar citación',
        doi: 'doi:',
        pmid: 'PMID:',
        volAbrv: 'vol.',
        seeMore: 'Ver más',
      },
      publicationModal: {
        close: 'Cerrar',
        title: 'Publicaciones',
      },
      publicationTooltip:
        'Publicaciones generadas por el grupo de investigación asociado con este estudio.',
      selection_criteria: 'Criterios de selección',
      study: 'Estudio',
      study_code: 'Código de estudio',
      study_contact: 'Contacto de estudio',
      study_design: 'Diseño de estudio',
      study_designs_table: 'Diseño',
      study_name: 'Nombre del estudio',
      study_website: 'Sitio web del estudio',
      statistic: {
        header: 'Estadísticas resumen',
        mondo: 'Diagnósticos más frecuentes (MONDO)',
        phenotype: 'Fenotipos más frecuentes (HPO)',
        title: 'Estadísticas',
      },
      title: 'Datos',
      unharmonized: 'No armonizado',
      unharmonizedAbrv: 'U',
      unharmonizedTooltip:
        'Datos no armonizados se refiere a datos crudos de un estudio que no se han normalizado al modelo de datos INCLUDE, limitando la comparación directa con otros estudios.',
      unharmonizedWarningTooltip:
        'Los datos de este estudio no han sido armonizados al modelo de datos INCLUDE.',
      virtual_biorepository_email: 'Correo electrónico del biorepositorio virtual',
      virtual_biorepository_url: 'URL del biorepositorio virtual',
    },
    variant: {
      no_gene: 'Sin gen',
      participant: '{count, plural, =0 {Participante} =1 {Participante} other {Participantes}}',
      type: {
        abrv: {
          insertion: 'Ins',
          deletion: 'Del',
          snv: 'SNV',
          null: 'ND',
          indel: 'Ind',
          substitution: 'Sub',
          sequence_alteration: 'SeqAlt',
        },
        tooltip: {
          insertion: 'Inserción',
          deletion: 'Eliminación',
          snv: 'SNV',
          null: 'Sin datos',
          indel: 'Indel',
          substitution: 'Sustitución',
          sequence_alteration: 'Alteración secuencial',
        },
      },
    },
  },
  upload: {
    gene: {
      ids: {
        modal: {
          title: 'Subir una lista de genes',
          placeholder: 'Ej. ENSG00000157764, TP53',
          submittedColTitle: 'Identificadores de genes enviados',
          uploadBtnText: 'Subir una lista de genes',
          mappedTo: 'Mapeado a',
          collapseTitle:
            'Tabla resumen ({matchCount} coincidentes, {unMatchCount} no coincidentes)',
          identifiers: 'Símbolo de gen, Alias de gen, ID de Ensembl',
          input: {
            label: 'Copiar y pegar una lista de identificadores o subir un archivo',
          },
          match: 'Coincidente ({count})',
          unmatch: 'No coincidente ({count})',
          table: {
            message:
              '{submittedCount} identificadores enviados mapeados a {mappedCount} identificadores únicos del sistema',
            match: {
              idcol: {
                title: 'ID de gen',
              },
              matchcol: {
                title: 'ID de Ensembl',
              },
              mappedcol: {
                title: 'Símbolo',
              },
            },
          },
          pill: {
            title: 'Lista subida',
          },
          upload: {
            btn: 'Subir',
            file: {
              btn: 'Subir un archivo',
            },
          },
          clear: {
            btn: 'Borrar',
          },
          cancel: {
            btn: 'Cancelar',
          },
          empty: {
            table: 'Sin datos',
          },
        },
      },
    },
    sample: {
      ids: {
        modal: {
          title: 'Subir una lista de muestras',
          submittedColTitle: 'Identificadores de muestras enviados',
          uploadBtnText: 'Subir una lista de muestras',
          mappedTo: 'Mapeado a',
          collapseTitle:
            'Tabla resumen ({matchCount} coincidentes, {unMatchCount} no coincidentes)',
          identifiers: 'ID de muestra',
          input: {
            label: 'Copiar y pegar una lista de identificadores o subir un archivo',
          },
          match: 'Coincidente ({count})',
          unmatch: 'No coincidente ({count})',
          table: {
            message:
              '{submittedCount} identificadores enviados mapeados a {mappedCount} identificadores únicos del sistema',
            match: {
              idcol: {
                title: 'ID de muestra',
              },
              matchcol: {
                title: 'ID de muestra',
              },
              mappedcol: {
                title: 'ID de muestra',
              },
            },
          },
          pill: {
            title: 'Lista subida',
          },
          upload: {
            btn: 'Subir',
            file: {
              btn: 'Subir un archivo',
            },
          },
          clear: {
            btn: 'Borrar',
          },
          cancel: {
            btn: 'Cancelar',
          },
          empty: {
            table: 'Sin datos',
          },
        },
      },
    },
  },
};

export default es;
