export default photoPreviewTemplate = `
  <template>
    <style>
      img {
        width: 200px; 
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .image-preview {
        cursor: pointer;
        display: flex;
        position: relative;
        height: 100%;
        margin-bottom: 0.75rem;
      }

      .info-overlay {
        background-color: rgba(0 0 0 / 50%) ;
        position: absolute;
        bottom: 0;
        inset-inline: 0;

        padding: 0.5rem 0.5rem 0.75rem 1rem;
        opacity: 0;
        transition: opacity 0.2s ease-in;
        backdrop-filter: blur(4px);
        border-radius: 0px 0px 8px 8px;

        display: flex;
        align-items: center;
        line-height: 1.1;
      }

      .font-caption {
        font-size: 0.825rem;
      }

      .font-mini {
        font-size: 0.75rem;
      }

      .text-bright {
        color: white
      }

      a {
        color: #adadad
      }

      .icon-container {
        width: 16px;
        height: 16px;
        margin-left: auto;
        margin-right: 0.5rem;
        transition: transform 100ms
      }
 
      .icon-container:hover {
        transform: scale(1.01);
      }

      .info-content {
        padding-right: 0.25rem
      }

    </style>

    <div class="image-preview">
      <img alt="Image Preview" />
      <div class="info-overlay">
      <div class="info-content">
        <span class="font-mini photographer-label">Photo by</span>
        <span class="font-mini">
          <a href="#" id="photographer-source" target="_blank">
          </a>
        </span>

         <span class="font-mini">
         on 
          <a href="https://unsplash.com/?utm_source=stock-pix-penpot&utm_medium=referral" target="_blank">
            Unsplash
          </a>
        </span>
      </div>

      <div class="icon-container">
        <a id="image-url" href="#" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
        </a>
      </div>
      </div>
    </div>
  </template>
`;