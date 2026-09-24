(() => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  function setNavOpen(isOpen) {
    if (!(navToggle instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) {
      return;
    }

    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      nav.setAttribute('data-open', 'true');
    } else {
      nav.removeAttribute('data-open');
    }
  }

  if (navToggle instanceof HTMLButtonElement && nav instanceof HTMLElement) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') !== 'true';
      setNavOpen(isOpen);
    });

    nav.addEventListener('click', (event) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!(link instanceof HTMLAnchorElement) || !nav.contains(link)) {
        return;
      }

      setNavOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (event.key !== 'Escape' || !isOpen) {
        return;
      }

      setNavOpen(false);
      navToggle.focus();
    });
  }

  const gallery = document.querySelector('[data-gallery]');
  const dialog = document.querySelector('[data-image-dialog]');
  const dialogImage = dialog?.querySelector('[data-dialog-image]');
  const dialogCaption = dialog?.querySelector('[data-dialog-caption]');
  const dialogClose = dialog?.querySelector('[data-dialog-close]');
  let dialogOpener = null;

  const hasDialogSupport = typeof HTMLDialogElement !== 'undefined';
  if (
    gallery instanceof HTMLElement
    && hasDialogSupport
    && dialog instanceof HTMLDialogElement
    && dialogImage instanceof HTMLImageElement
    && dialogCaption instanceof HTMLElement
  ) {
    gallery.addEventListener('click', (event) => {
      const button = event.target instanceof Element
        ? event.target.closest('button[data-full]')
        : null;
      if (!(button instanceof HTMLButtonElement) || !gallery.contains(button)) {
        return;
      }

      const sourceImage = button.querySelector('img');
      if (!(sourceImage instanceof HTMLImageElement)) {
        return;
      }

      const imageSource = button.dataset.full || sourceImage.currentSrc || sourceImage.src;
      const imageAlt = sourceImage.alt;
      if (!imageSource) {
        return;
      }

      dialogImage.src = imageSource;
      dialogImage.alt = imageAlt;
      dialogCaption.textContent = imageAlt;
      dialogImage.toggleAttribute("data-edge-crop", button.hasAttribute("data-edge-crop"));
      dialogOpener = button;

      if (!dialog.open) {
        dialog.showModal();
      }
    });

    if (dialogClose instanceof HTMLButtonElement) {
      dialogClose.addEventListener('click', () => {
        if (dialog.open) {
          dialog.close();
        }
      });
    }

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener('close', () => {
      if (dialogOpener?.isConnected) {
        dialogOpener.focus();
      }
      dialogOpener = null;
    });
  }
})();
