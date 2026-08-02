/**
 * Malika Portfolio - Interactivity & Gallery Controller
 * Standardized Vanilla JavaScript Application
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Performance, Network-Aware & WebP Optimization Helpers ---
    const isSlowConnection = () => {
        if ('connection' in navigator) {
            const conn = navigator.connection;
            if (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.effectiveType === '3g') {
                return true;
            }
        }
        return false;
    };

    const getOptimizedMediaUrl = (url) => {
        if (!url) return url;
        if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')) {
            return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
        return url;
    };

    // Global Image Fade-In Handler (CLS & Smooth Skeleton Shimmer Removal)
    const initProgressiveImageLoading = () => {
        const handleImg = (img) => {
            if (img.complete && img.naturalWidth > 0) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => img.classList.add('loaded'));
                img.addEventListener('error', () => {
                    // Fallback to original JPG if WebP fails
                    if (img.src && img.src.endsWith('.webp')) {
                        img.src = img.src.replace(/\.webp$/i, '.jpg');
                    }
                });
            }
        };

        document.querySelectorAll('img').forEach(handleImg);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'IMG') handleImg(node);
                        node.querySelectorAll && node.querySelectorAll('img').forEach(handleImg);
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    };

    initProgressiveImageLoading();

    // Register High-Performance Service Worker for Aggressive Caching & Offline Support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('Service Worker Registered:', reg.scope);
            }).catch(err => {
                console.warn('Service Worker registration skipped:', err);
            });
        });
    }

    // --- Dynamic Artwork Database ---
    const artworkItems = [
        // --- 01. PLATE CATEGORY ---
        {
            id: 'mahogany-plate',
            title: 'Mahogany Plate Wall Decoration – Handcrafted Process',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/mahogany/mahogany_finished.webp',
            description: 'Mahogany Plate Wall Decoration – Step-by-Step Creation Guide:\n\nStep 01 (Surface Prep): Selecting a mahogany plate (12"/24") & thoroughly priming surface with white base coat.\nStep 02 (Layout Sketch): Softly sketching concentric guidelines, mandala patterns & Sri Lankan motifs with pencil.\nStep 03 (Fine Painting): Hand-painting with fine detail brushes (00/000/0000) & vibrant acrylic colors from center outward.\nStep 04 (Sealing & Varnish): Applying clear protective spray varnish to shield from dust & preserve wood grain brilliance.'
        },
        {
            id: 'mahogany-step-1',
            title: 'Mahogany Plate Prep - Step 01: Raw Wood Plates',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/mahogany/mahogany_step1.webp',
            description: 'Selecting premium mahogany wood plates (12"/24") and inspecting wood grain surface.'
        },
        {
            id: 'mahogany-step-2',
            title: 'Mahogany Plate Prep - Step 02: Circle Guideline Pencil Outline',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/mahogany/mahogany_step2.webp',
            description: 'Measuring and softly sketching concentric circle guidelines with pencil.'
        },
        {
            id: 'mahogany-step-3',
            title: 'Mahogany Plate Prep - Step 03: Concentric Mandala Pencil Layout',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/mahogany/mahogany_step3.webp',
            description: 'Sketching intricate Sri Lankan floral and geometric mandala motifs with precision pencil work.'
        },
        {
            id: 'temple-art',
            title: 'Traditional Temple Art Sri Lanka',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/temple_art.webp',
            description: 'Intricate traditional Sri Lankan temple motif hand-painted on wood plate.'
        },
        {
            id: 'lotus-mandala-yellow',
            title: 'Lotus Mandala Art',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/lotus_mandala_yellow.webp'
        },
        {
            id: 'swans-plate',
            title: 'Three Swans Mandala',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/swans_plate.webp'
        },
        {
            id: 'liyavala-art',
            title: 'Liyavala Sri Lankan Art',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/liyavala_art.webp'
        },
        {
            id: 'uncommon-mandala',
            title: 'Uncommon Mandala Art',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/uncommon_mandala.webp'
        },
        {
            id: 'traditional-art-mandala',
            title: 'Traditional Art Mandala',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/traditional_art_mandala.webp'
        },
        {
            id: 'traditional-dancer',
            title: 'Traditional Dancer in Sri Lanka',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/traditional_dancer.webp'
        },
        {
            id: 'plate-2',
            title: 'Majestic Sunflower Plate',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate2.webp'
        },
        {
            id: 'plate-4',
            title: 'Crimson Lotus Mandala',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate4.webp'
        },
        {
            id: 'plate-1',
            title: 'Traditional Yak Mask Plate',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate1.webp'
        },
        {
            id: 'plate-3',
            title: 'Fiery Sun Mandala',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate3.webp'
        },
        {
            id: 'plate-5',
            title: 'Floral Mandalas Collection',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate5.webp'
        },
        {
            id: 'plate-6',
            title: 'Traditional Sri Lankan Motif',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate6.webp'
        },
        {
            id: 'plate-7',
            title: 'Sunburst Ceramic Plate',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate7.webp'
        },
        {
            id: 'plate-8',
            title: 'Royal Mandala Plate',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate8.webp'
        },
        {
            id: 'plate-9',
            title: 'Autumn Lotus Plate',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate9.webp'
        },
        {
            id: 'plate-10',
            title: 'Turquoise Bloom Mandala',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/plate10.webp'
        },
        {
            id: 'dubai-culture',
            title: 'Dubai Culture',
            category: 'Plate',
            filter: 'plate',
            image: 'assets/plates/dubai_culture.webp'
        },
        {
            id: 'video-mahogany-1',
            title: 'Mahogany Plate Crafting Process Video 01',
            category: 'Plate – Video',
            filter: 'plate',
            video: 'assets/videos/mahogany/plate_1.mp4',
            image: 'assets/mahogany/mahogany_finished.webp',
            description: 'Hand-carving and initial pattern sketching on solid mahogany wood plate.'
        },
        {
            id: 'video-mahogany-2',
            title: 'Mahogany Plate Fine Detailing Video 02',
            category: 'Plate – Video',
            filter: 'plate',
            video: 'assets/videos/mahogany/plate_2.mp4',
            image: 'assets/mahogany/mahogany_paints.webp',
            description: 'Precision fine-brush mandala painting on mahogany surface.'
        },

        // --- 02. 3D CEMENT ART CATEGORY ---
        {
            id: '3d-cement-birds-flowers',
            title: '3D Cement & Texture Relief Art – Sculpting Masterpiece',
            category: '3D Cement Art',
            filter: '3d-cement',
            images: [
                'assets/cement/3d_cement_birds_flowers.webp',
                'assets/cement/cement_progress_step1_sculpt.webp',
                'assets/cement/cement_progress_step2_color.webp',
                'assets/cement/cement_progress_step3_shading.webp',
                'assets/cement/cement_progress_step4_final.webp'
            ],
            image: 'assets/cement/3d_cement_birds_flowers.webp',
            description: '3D Cement & Wall Putty Texture Art – 4-Stage Relief Process:\n\nStage 01 (Raw Sculpting): Blending cement, wall putty & PVA glue to sculpt 3D bird and floral shapes in high relief.\nStage 02 (Initial Glazing): Applying vibrant base acrylic washes over cured 3D cement shapes.\nStage 03 (Shading & Tinting): Deepening background shadow tones to accentuate high-relief depth.\nStage 04 (Varnished Finish): Sealing with gloss varnish for a durable, lustrous relief finish.'
        },
        {
            id: '3d-rose-relief-final',
            title: '3D Rose Relief - Crimson & Gold Masterpiece',
            category: '3D Cement Art',
            filter: '3d-cement',
            images: [
                'assets/cement/3d_rose_relief_final.webp',
                'assets/cement/3d_rose_relief_sculpt.webp',
                'assets/cement/3d_rose_relief_base_color.webp',
                'assets/cement/3d_rose_relief_pink.webp'
            ],
            image: 'assets/cement/3d_rose_relief_final.webp'
        },
        {
            id: '3d-cement-tools',
            title: '3D Sculpting & Texture Tools',
            category: '3D Cement Art',
            filter: '3d-cement',
            description: 'Specialized palette knives and sculpting tools used to carve 3D relief details into wet cement paste.',
            image: 'assets/cement/3d_cement_tools.webp'
        },
        {
            id: 'video-cement-1',
            title: '3D Texture Sculpting & Paste Mixing Video 01',
            category: '3D Cement Art – Video',
            filter: '3d-cement',
            video: 'assets/videos/cement/cement_1.mp4',
            image: 'assets/cement/3d_cement_birds_flowers.webp',
            description: 'Blending cement & wall putty mixture and sculpting relief shapes onto board.'
        },
        {
            id: 'video-cement-2',
            title: '3D Relief Carving & Detailing Video 02',
            category: '3D Cement Art – Video',
            filter: '3d-cement',
            video: 'assets/videos/cement/cement_2.mp4',
            image: 'assets/cement/3d_rose_relief_final.webp',
            description: 'Using fine palette knives to sculpt delicate petal outlines.'
        },

        // --- 03. 3D WALL DECORATION CATEGORY ---
        {
            id: '3d-wall-collection-display',
            title: '3D Wall Decoration Relief Art Panels Showcase',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_collection_display.webp',
            description: '🖼️ 3D Wall Decoration Relief Panels Collection:\n\nHigh-relief floral wall panels crafted with specialized sculpting paste and gold frame borders, featuring Lotus flowers, Orchids, Sunflowers, Calla Lilies, Yellow Tulips, Daisies, and Cherry Blossoms.'
        },
        {
            id: '3d-wall-white-gold-lotus',
            title: 'White & Gold Lotus 3D Relief',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_white_gold_lotus.webp'
        },
        {
            id: '3d-wall-cherry-blossom-vertical',
            title: 'Cherry Blossom Branch 3D Relief (Vertical)',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_cherry_blossom_vertical.webp'
        },
        {
            id: '3d-wall-golden-sunflowers',
            title: 'Golden Sunflowers 3D Relief',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_golden_sunflowers.webp'
        },
        {
            id: '3d-wall-cherry-blossom-horizontal',
            title: 'Cherry Blossom Tree Branch 3D Relief (Horizontal)',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_cherry_blossom_horizontal.webp'
        },
        {
            id: '3d-wall-purple-orchids',
            title: 'Purple Orchids 3D Relief',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_purple_orchids.webp'
        },
        {
            id: '3d-wall-calla-lilies-panel',
            title: 'White Calla Lilies 3D Relief Panel',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_calla_lilies_panel.webp'
        },
        {
            id: '3d-wall-yellow-tulips',
            title: 'Yellow Tulips Bouquet 3D Relief',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_yellow_tulips.webp'
        },
        {
            id: '3d-wall-white-daisies',
            title: 'White Daisies 3D Relief',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_white_daisies.webp'
        },
        {
            id: '3d-wall-calla-lilies-bouquet',
            title: 'Calla Lilies Bouquet 3D Relief',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_calla_lilies_bouquet.webp'
        },
        {
            id: '3d-wall-crimson-roses-panel',
            title: 'Crimson Roses Bouquet 3D Relief Panel',
            category: '3D Wall Decoration',
            filter: '3d-wall',
            image: 'assets/3d_wall/3d_wall_crimson_roses_panel.webp'
        },

        // --- 04. CANVAS ART CATEGORY ---
        {
            id: 'canvas-elephant-family',
            title: '"The Love of an Elephant Family" – Handcrafted Canvas Masterpiece',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_elephant_family_masterpiece.webp',
            description: '🎨 Handcrafted Canvas Art – Step-by-Step Journey & Materials Breakdown:\n\n"The beloved collection of tools and colors that breathed life into my canvas art.. To color and bring life to any empty space, and to transform a blank canvas into a vibrant painting, this precious collection of tools and colors has been my ultimate guide."\n\n• Sketching & Measuring: Rulers, measuring tapes, pencils, and erasers for accurate cutting & sketching.\n• Background & Blending: Wide flat brushes for gesso priming and watercolor-style acrylic blending.\n• Fine Brushes (00, 000, 0000): Thinnest brush set for eyes, fine body lines, and detailed borders.\n• Acrylic Paints & Palette: High-quality acrylics (blue, orange, red, yellow) and palette for mixing.\n• Varnish Protective Coat: Clear varnish spray applied at the end to seal and protect from dust & moisture.'
        },
        {
            id: 'canvas-elephants-twin-garden',
            title: 'Elephant Family Twin Canvases Studio & Garden View',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_elephants_twin_garden.webp'
        },
        {
            id: 'canvas-buddha-progress-3panel',
            title: 'Lotus Buddha Canvas Painting Journey',
            category: 'Canvas Painting',
            filter: 'canvas',
            images: [
                'assets/canvas/canvas_buddha_new_step1_sketch.webp',
                'assets/canvas/canvas_buddha_new_step2_background.webp',
                'assets/canvas/canvas_buddha_new_step3_finished.webp',
                'assets/canvas/canvas_buddha_new_step4_studio.webp'
            ],
            image: 'assets/canvas/canvas_buddha_new_step3_finished.webp'
        },
        {
            id: 'canvas-jesus-popart',
            title: 'Circular Pop Art Jesus Portrait Canvas',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_jesus_circular_popart.webp'
        },
        {
            id: 'canvas-perahera-progress-to-finished-frame',
            title: 'Traditional Sri Lankan Temple Procession (Esala Perahera) Canvas Art',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_perahera_finished_masterpiece.webp'
        },
        {
            id: 'canvas-tiger-mandala',
            title: 'Blue & Yellow Tiger Mandala Canvas Art',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_tiger_mandala_art.webp'
        },
        {
            id: 'canvas-shiva-monochrome',
            title: 'Lord Shiva Monochrome Canvas Art',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_shiva_monochrome.webp'
        },
        {
            id: 'canvas-woman-geometric-popart',
            title: 'Geometric Low-Poly Woman Portrait Canvas',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_woman_geometric_popart.webp'
        },
        {
            id: 'canvas-elephant-embrace-circular',
            title: 'Mother & Baby Elephant Embrace Circular Canvas',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_elephant_embrace_circular.webp'
        },
        {
            id: 'canvas-red-supra-car',
            title: 'Red Toyota Supra Custom Automotive Canvas Art',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_red_supra_car.webp'
        },
        {
            id: 'canvas-trio-circular-grass-display',
            title: 'Trio Handcrafted Circular Canvases Studio Display',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_trio_circular_grass_display.webp'
        },
        {
            id: 'canvas-majestic-elephant-2panel-frame',
            title: 'Majestic Colorful Elephant Canvas Art',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_majestic_elephant_2panel_frame.webp'
        },
        {
            id: 'canvas-sunflower-woman-circular',
            title: 'Sunflower & Autumn Leaves Woman Face Circular Canvas',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_sunflower_woman_circular.webp'
        },
        {
            id: 'canvas-trio-garden-studio-display',
            title: 'Garden Studio Masterpieces Display',
            category: 'Canvas Painting',
            filter: 'canvas',
            image: 'assets/canvas/canvas_trio_garden_studio_display.webp'
        },
        {
            id: 'video-canvas-1',
            title: 'Canvas Painting & Background Layering Video 01',
            category: 'Canvas Painting – Video',
            filter: 'canvas',
            video: 'assets/videos/canvas/canvas_video.mp4',
            image: 'assets/canvas/canvas_elephant_family_masterpiece.webp',
            description: 'Blending watercolor acrylic tones and sketching detailed outlines on custom canvas.'
        },
        {
            id: 'video-canvas-2',
            title: 'Canvas Fine Details & Varnish Sealing Video 02',
            category: 'Canvas Painting – Video',
            filter: 'canvas',
            video: 'assets/videos/canvas/canvas_video_2.mp4',
            image: 'assets/canvas/canvas_buddha_lotus_finished.webp',
            description: 'Precision brush detailing and applying clear protective sealer over finished canvas art.'
        },

        // --- 05. JEWELLERY CATEGORY ---
        {
            id: 'jewelry-unique-creations-full-wide',
            title: 'Unique Handcrafted Accessories & Decor Showcase',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/jewelry_unique_creations_pendant_card.webp',
            description: '🦋 Handcrafted Wooden Butterfly & Floral Jewelry Showcase:\n\n• Born from a blank sheet of plywood, a butterfly’s majesty brought to life with nature\'s vibrant colors...\n\nHand-painted butterfly & floral necklaces, saree brooches, blouse clips, and custom wooden lifestyle accessories crafted with precision.'
        },
        {
            id: 'handcrafted-wooden-butterfly-jewelry',
            title: 'Handcrafted Wooden Butterfly & Floral Jewelry – 8-Step Crafting Journey',
            category: 'Jewellery',
            filter: 'jewellary',
            images: [
                'assets/jewellary/butterfly_step1_plywood_stack.webp',
                'assets/jewellary/butterfly_step2_sketch_tools.webp',
                'assets/jewellary/butterfly_step3_cutout_shapes.webp',
                'assets/jewellary/butterfly_step4_hand_cutout.webp',
                'assets/jewellary/butterfly_handheld_pink_yellow_featured.webp'
            ],
            image: 'assets/jewellary/butterfly_painted_pair_featured_new.webp'
        },
        {
            id: 'jewelry-saree-brooches-blouse-clips',
            title: 'Elegant Saree Brooches & Matching Blouse Clips',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/jewelry_creation_butterfly_brooches_quad.webp'
        },
        {
            id: 'jewelry-daisy-necklaces',
            title: 'Hand-Painted Daisy & Floral Necklaces',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/jewelry_creation_daisy_necklaces.webp'
        },
        {
            id: 'jewelry-packaged-butterflies',
            title: 'Bespoke Packaged Wooden Butterfly Accessories',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/jewelry_creation_packaged_butterflies.webp'
        },
        {
            id: 'jewelry-full-kit-hardware',
            title: 'Plywood Jewelry Full Tools & Hardware Kit',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/plywood_jewelry_tools_hardware_cat_keychain.webp'
        },
        {
            id: 'jewelry-cat-charms',
            title: 'Handcrafted Wooden Cat Charms Pair',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/jewelry_cat_charms_pair.webp'
        },
        {
            id: 'jewelry-rotary-tools',
            title: 'Rotary Drill & Micro Tools Collection',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/jewelry_tools_hardware_kit_full.webp'
        },
        {
            id: 'jewelry-metal-findings',
            title: 'Precision Metal Findings & Jump Rings',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/jewelry_metal_findings_close_up.webp'
        },
        {
            id: 'jewelry-unpainted-daisy-cutout',
            title: 'Unpainted Wooden Daisy Flower Cutout',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/wood_daisy_unpainted_cutout.webp'
        },
        {
            id: 'jewelry-painted-daisy-flower',
            title: 'Hand-Painted White & Yellow Daisy Flower Cutout',
            category: 'Jewellery',
            filter: 'jewellary',
            image: 'assets/jewellary/wood_daisy_painted_white_yellow.webp'
        },
        {
            id: 'video-jewellary-1',
            title: 'Plywood Jewelry Micro-Drilling & Assembly Video 01',
            category: 'Jewellery – Video',
            filter: 'jewellary',
            video: 'assets/videos/jewellary/flywood_1.mp4',
            image: 'assets/jewellary/jewelry_cat_charms_pair.webp',
            description: 'Drilling precise micro-holes into wooden butterfly cutouts and attaching jump rings.'
        },
        {
            id: 'video-jewellary-2',
            title: 'Hand-Painted Butterfly & Floral Jewelry Showcase Video 02',
            category: 'Jewellery – Video',
            filter: 'jewellary',
            video: 'assets/videos/jewellary/flywood_2.mp4',
            image: 'assets/jewellary/handcrafted_wooden_butterfly_jewelry.webp',
            description: 'Vibrant color blending, fine vein detailing, and keytag/necklace hardware assembly.'
        },

        // --- 06. PROJECTS CATEGORY ---
        {
            id: 'sunburst-pendant',
            title: 'Diverse Journey Across Visual Arts & Craftsmanship Showcase',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/wolf_mandala_line_art.webp',
            description: '🏫 School & Outdoor Project Murals, Coconut Crafts & Line Art Showcase:\n\nDriven by a lifelong passion for art and a curiosity to explore new mediums, I have intentionally expanded my creative expressions beyond a single format. From delicate paper line art to eco-friendly wood and coconut crafts, fabric paintings, and large-scale murals, I look at every surface as a canvas. Here is a curated view of my past milestones and ongoing artistic projects.'
        },
        {
            id: 'buddha-mandala',
            title: 'Buddha Mandala Line Art',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/buddha_mandala.webp'
        },
        {
            id: 'clock-line-art',
            title: 'Vintage Clock Line Art',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/clock_line_art.webp'
        },
        {
            id: 'ladies-fashion-line-art',
            title: 'Ladies Fashion Line Art',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/ladies_fashion_line_art.webp'
        },
        {
            id: 'owl-mandala',
            title: 'Owl Mandala Line Art',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/owl_mandala.webp'
        },
        {
            id: 'cultural-dancers',
            title: 'Traditional Sri Lankan Dancers',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/cultural_dancers.webp'
        },
        {
            id: 'perahera-procession',
            title: 'Sri Dalada Perahera Procession',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/perahera_procession.webp'
        },
        {
            id: 'blue-floral-mandala',
            title: 'Blue Floral Mandala',
            category: 'Line Art',
            filter: 'project',
            image: 'assets/line_art/blue_floral_mandala.webp'
        },
        {
            id: 'serapendiya-katayam',
            title: 'Traditional Serapendiya Motif',
            category: 'Pendent Art',
            filter: 'project',
            image: 'assets/pendant_art/serapendiya_katayam.webp'
        },
        {
            id: 'hansa-katayam',
            title: 'Traditional Hansa Motif',
            category: 'Pendent Art',
            filter: 'project',
            image: 'assets/pendant_art/hansa_katayam.webp'
        },
        {
            id: 'scroll-katayam',
            title: 'Traditional Scroll Katayam',
            category: 'Pendent Art',
            filter: 'project',
            image: 'assets/pendant_art/scroll_katayam.webp'
        },
        {
            id: 'circular-katayam',
            title: 'Circular Traditional Mandala Motif',
            category: 'Pendent Art',
            filter: 'project',
            image: 'assets/pendant_art/circular_katayam.webp'
        },
        {
            id: 'heart-katayam',
            title: 'Heart Floral Katayam Motif',
            category: 'Pendent Art',
            filter: 'project',
            image: 'assets/pendant_art/heart_katayam.webp'
        },
        {
            id: 'coconut-lamp-combined',
            title: 'Coconut Handmade Lamp',
            category: 'Coconut Handmade Lamp',
            filter: 'project',
            image: 'assets/coconut/coconut_lamp_combined.webp'
        },
        {
            id: 'coconut-crafts-display',
            title: 'Coconut Handmade Lamp Collection',
            category: 'Coconut Handmade Lamp',
            filter: 'project',
            image: 'assets/coconut/coconut_crafts_display.webp'
        },
        {
            id: 'coconut-jewelry-set',
            title: 'Jewelry Set Coconut Handmade',
            category: 'Coconut Handmade Lamp',
            filter: 'project',
            image: 'assets/coconut/coconut_jewelry_set.webp'
        },
        {
            id: 'coconut-clock-pen-holder',
            title: 'Original Coconut Clock with Pen Holder',
            category: 'Coconut Handmade Lamp',
            filter: 'project',
            image: 'assets/coconut/coconut_clock_pen_holder.webp'
        },
        {
            id: 'coconut-gift-item-handmade',
            title: 'Coconut Gift Item Handmade',
            category: 'Coconut Handmade Lamp',
            filter: 'project',
            image: 'assets/coconut/coconut_gift_item_handmade.webp'
        },
        {
            id: 'pastel-art-portrait',
            title: 'Pastel Art Portrait',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/pastel/pastel_art_portrait.webp'
        },
        {
            id: 'gray-cloth-hand-paint-work',
            title: 'Gray Cloth Hand Paint Work',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/fabric/gray_cloth_hand_paint_work.webp'
        },
        {
            id: 'fabric-art-sunflower',
            title: 'Hand-painted Fabric Art - Sunflower Motif',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/fabric/fabric_art_sunflower.webp'
        },
        {
            id: 'traditional-mask-fabric-bags',
            title: 'Traditional Sri Lankan Mask Fabric Bags',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/fabric/traditional_mask_fabric_bags.webp'
        },
        {
            id: 'religious-iconography-bag',
            title: 'Religious Iconography Hand-Painted Fabric Art',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/fabric/religious_iconography_bag.webp'
        },
        {
            id: 'fabric-art-sketches',
            title: 'Fabric Art Sketching Process',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/fabric/fabric_art_sketches.webp'
        },
        {
            id: 'traditional-mask-single-bag',
            title: 'Traditional Mask Hand-Painted Canvas Bag',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/fabric/traditional_mask_single_bag.webp'
        },
        {
            id: 'mask-pencil-sketch',
            title: 'Traditional Mask Layout Pencil Sketch',
            category: 'Pastel Art',
            filter: 'project',
            image: 'assets/fabric/mask_pencil_sketch.webp'
        },
        {
            id: 'school-mural-cube',
            title: 'School Wall Mural - 3D Cube Design',
            category: 'School Work',
            filter: 'project',
            image: 'assets/school/school_mural_cube.webp'
        },
        {
            id: 'school-mural-tree',
            title: 'Educational Classroom Tree Mural',
            category: 'School Work',
            filter: 'project',
            image: 'assets/school/school_mural_tree.webp'
        },
        {
            id: 'school-mural-shapes',
            title: 'Educational Geometric Shapes Wall Mural',
            category: 'School Work',
            filter: 'project',
            image: 'assets/school/school_mural_shapes.webp'
        },
        {
            id: 'giraffe-cutout-art',
            title: 'Educational Giraffe Cutouts for School Spaces',
            category: 'School Work',
            filter: 'project',
            image: 'assets/school/giraffe_cutout_art.webp'
        },
        {
            id: 'giraffe-monkey-cutout',
            title: 'School Character Cutouts - Giraffe & Monkey',
            category: 'School Work',
            filter: 'project',
            image: 'assets/school/giraffe_monkey_cutout.webp'
        },
        {
            id: 'monkey-tree-frame',
            title: 'Interactive Monkey & Tree Cutout Frame',
            category: 'School Work',
            filter: 'project',
            image: 'assets/school/monkey_tree_frame.webp'
        },
        {
            id: 'traditional-yoga-school-mural',
            title: 'Traditional Yoga School & Wellness Mural',
            category: 'Other Works',
            filter: 'project',
            image: 'assets/school/traditional_yoga_school_mural.webp'
        },
        {
            id: 'yoga-wellness-mural',
            title: 'Yoga & Wellness Center Wall Mural',
            category: 'Other Works',
            filter: 'project',
            image: 'assets/school/yoga_wellness_mural.webp'
        },
        {
            id: 'video-project-1',
            title: 'Project Wall Mural & Outdoor Commission Video 01',
            category: 'Other Works – Video',
            filter: 'project',
            video: 'assets/videos/project/video_project_6.mp4',
            image: 'assets/school/school_mural_cube.webp',
            description: 'Executing scale wall murals and outdoor commission projects.'
        },
        {
            id: 'video-project-2',
            title: 'Project Educational Visuals & Mural Showcase Video 02',
            category: 'Other Works – Video',
            filter: 'project',
            video: 'assets/videos/project/video_project_7.mp4',
            image: 'assets/school/school_mural_tree.webp',
            description: 'Educational art cutouts, classroom visual aids, and interactive school murals.'
        }
    ];
    let currentLang = localStorage.getItem('malika_lang') || 'en';

    const translations = {
        en: {
            nav_bio: "Bio",
            nav_mystory: "My Story",
            nav_qualifications: "Qualifications",
            nav_tools: "Studio Tools",
            nav_showcase: "Collections Showcase",
            nav_inquire: "Inquire",

            qual_tag: "Education & Qualifications",
            qual_h2: "QUALIFICATIONS",
            qual_subtitle: "A verified operational trajectory built upon discipline and industrial certification",
            qual_1_title: "G.C.E. Ordinary Level (O/L)",
            qual_1_inst: 'Academic Pass — "B" Grade Evaluation in Fine Arts Division',
            qual_1_desc: "Foundational academic evaluation establishing core visual arts principles, technical drawing, and classical art history.",
            qual_2_title: "G.C.E. Advanced Level (A/L)",
            qual_2_inst: 'Humanities Stream — "B" Grade Evaluation in Fine Arts Matriculation',
            qual_2_desc: "Advanced matriculation focusing on cultural heritage, traditional South Asian aesthetics, and creative composition.",
            qual_3_title: "Professional Certification in Batik Dyeing & Garment Manufacturing",
            qual_3_inst: "Sri Lanka Institute of Textile & Apparel (SLITA) — Technical Campus",
            qual_3_desc: "Industrial specialization in wax-resist batik application, dye chemistry, fiber composition, and apparel production systems.",
            qual_4_title: "Certificate in Fashion Design Infrastructure",
            qual_4_inst: "Singer Fashion Academy, National Headquarters, Sri Lanka",
            qual_4_desc: "Professional diploma covering structural garment drafting, precision pattern engineering, and haute couture finishing.",
            qual_5_title: "Advanced Training — Saree Jacket Manufacturing Technology",
            qual_5_inst: "Industrial Development Board of Ceylon (IDB) — State Executive Track",
            qual_5_desc: "State-certified executive training in ergonomic fitting, high-precision contour tailoring, and heritage textile construction.",

            mystory_tag: "Artist Philosophy & Vision",
            mystory_h2: "MY STORY",
            mystory_core_1_title: "Woodcraft Engineering",
            mystory_core_1_desc: "Precision mahogany & custom plywood structural treatment, freehand graphite layouts, and multi-tier relief carving.",
            mystory_core_2_title: "Jewelry Design Systems",
            mystory_core_2_desc: "Micro-drilling, fine metalsmithing, and miniature hand-painted accessories merging structural geometry with wearable art.",
            mystory_core_3_title: "Structural Ceramics",
            mystory_core_3_desc: "Architectural plaster mixtures, heritage Sri Lankan motifs, and advanced multi-tier ceramic glaze engineering.",
            mystory_sub1_tag: "Artistic Process",
            mystory_sub1_title: "My Artistic Evolution",
            mystory_sub1_p1: "My creative process begins at the raw physical level. When constructing woodcraft pieces, I hand-select local mahogany blocks or custom plywood panels, treating and preparing them to avoid warping over time. Every pattern is drawn out freehand with fine graphite layout structures before paint, carving or carving tools touch the surface.",
            mystory_sub1_p2: "For mixed media work, such as textile engineering and ceramic work, I adapt local Sri Lankan heritage patterns using a modern layout methodology. Each piece requires meticulous layering, relying on multi-tier lacquer finishes or precise architectural plaster mixtures to achieve accurate physical relief depth.",
            mystory_sub2_tag: "Core Philosophy",
            mystory_sub2_title: "Statement of Intent",
            mystory_sub2_p1: "Art is more than decorative layout; it is structural communication. I chose this medium because tactile objects tell stories across borders. My work combines structural wood engineering with intimate, fine jewelry detailing to display raw concepts inside fixed physical geometry.",
            mystory_quote_txt: "My immediate long-term ambition is to bridge South Asian ornamental craft traditions with standard German industrial art and design principles. Germany represents the apex of structural discipline, historic Bauhaus lineage, and material innovation. By immersing myself in the country's rigorous creative landscape, I aim to advance my specialization in architectural woodcarving, advanced jewelry metalsmithing, and structural ceramic glaze engineering.",
            mystory_quote_author: "Avima Arts and Craft Founder",
            mystory_int_tag: "International Objective",
            mystory_int_title: "Strategic Alignment with German Art Principles",
            mystory_int_p: "This portfolio is meticulously organized to serve as an entry point for advanced European validation. Focusing deeply on spatial awareness, cross-disciplinary material research, and sustainable craft preservation, this work demonstrates readiness for deep artistic research inside competitive continental ateliers and academies.",

            hero_role_1: "Handcraft",
            hero_role_2: "Fine Arts",
            hero_role_3: "Structural Design",
            hero_badge: "Exam Selection Board Review",
            hero_tagline: "Curating visual harmony through traditional patterns, precision geometry, and raw organic textures.",
            hero_cta: "View Portfolio Collections",

            about_tag: "Candidate Profile",
            about_h2_prefix: "A Diverse Journey Across ",
            about_h2_muted: "Visual Arts & Craftsmanship...",
            about_role_1: "CREATIVE MAKER",
            about_role_2: "DESIGNER",
            about_role_3: "ARTIST",
            about_text: "Driven by a lifelong passion for art and a curiosity to explore new mediums, I have intentionally expanded my creative expressions beyond a single format. From delicate paper line art to eco-friendly wood and coconut crafts, fabric paintings, and large-scale murals, I look at every surface as a canvas. Here is a curated view of my past milestones and ongoing artistic projects, categorized by medium and style.",
            about_focus: "Focus Areas",
            focus_1_title: "Line Art",
            focus_1_desc: "Executing intricate Mandala designs, high-contrast black-and-white line art, and traditional Sri Lankan motifs (such as the Hansa and Liyawel) with absolute precision and symmetry on paper and art boards.",
            focus_2_title: "Structural 3D & Relief Work",
            focus_2_desc: "Relief art and decorative motifs on concrete and wood surfaces.",
            focus_3_title: "Fabric & Handcrafted Objects",
            focus_3_desc: "Hand-painted fabric patterns, coconut shell crafts, and bespoke items.",

            tools_tag: "Inside the Studio",
            tools_h2: "Materials & Professional Tools",
            tool_1_title: "🛠️ 01. Sketching & Shaping Tools",
            tool_1_pencils_label: "Pencils & Erasers: ",
            tool_1_pencils_txt: "Used for sketching the initial layout and guidelines directly onto the wooden surface.",
            tool_1_geo_label: "Geometry Set: ",
            tool_1_geo_txt: "Compasses, rulers, and protractors used to measure precise circular shapes and maintain perfectly equal spacing.",
            tool_1_dots_label: "Dotting Tools: ",
            tool_1_dots_txt: "Double-ended metal-tipped tools in various sizes, essential for creating uniform dots and details.",
            tool_1_palette_label: "Color Palettes: ",
            tool_1_palette_txt: "Painting palettes used to mix and blend shades to create custom color combinations.",
            tool_2_title: "🖌️ 02. Brushes Collection",
            tool_2_bg_label: "Background Brushes (Flat & Large Brushes): ",
            tool_2_bg_txt: "Wide, flat brushes used to apply the white primary base coat evenly across the Mahogany plate.",
            tool_2_fine_label: "Fine Detail Brushes (00, 000, 0000): ",
            tool_2_fine_txt: "The thinnest, high-precision brush set, used to paint incredibly intricate designs completely freehand.",
            tool_3_title: "🎨 03. Paints & Mediums",
            tool_3_acrylic_label: "Acrylic Paints: ",
            tool_3_acrylic_txt: "High-quality acrylic paint tubes and bottles from various premium brands, used to give the artwork its vibrant, lifelike colors (specifically yellows, blues, blacks, and whites).",
            tool_3_gesso_label: "White Gesso / Primer: ",
            tool_3_gesso_txt: "A thick, white base coat applied to prime the raw wood surface, helping it absorb the paint smoothly and making the colors pop brilliantly.",
            tool_3_varnish_label: "Spray Varnish / Clear Sealer: ",
            tool_3_varnish_txt: "A protective clear spray applied at the end to seal the finished painting, shielding it from dust, moisture, and scratches while ensuring a long-lasting finish.",

            gallery_tag: "Collections Showcase",
            gallery_h2: "All Creative Works",

            cat_tab_plate: "Plates",
            cat_tab_3d_cement: "3D Cement Art",
            cat_tab_3d_wall: "3D Wall Decoration",
            cat_tab_canvas: "Canvas Art",
            cat_tab_jewellary: "Jewellery",
            cat_tab_project: "Projects",

            featured_badge: "✨ Featured Showcase Masterpiece",
            view_artwork: "View Artwork",
            watch_video: "▶ Watch Video",
            items_count_suffix: "Items",

            contact_tag: "Get in Touch",
            contact_h2: "Interview Evaluation Board",
            contact_desc: "If you have questions regarding the material, curing timelines, or double-firing variables of any piece, please leave an inquiry below.",
            contact_label_name: "Candidate Name",
            contact_label_email: "General Contact",
            form_label_name: "Your Name",
            form_placeholder_name: "Board Review Panelist",
            form_label_email: "Your Email",
            form_placeholder_email: "reviewer@examboard.gov",
            form_label_interest: "Artwork of Interest",
            form_select_default: "Select a category",
            form_opt_plate: "Mahogany & Ceramic Plates",
            form_opt_3d_cement: "3D Cement Decoration",
            form_opt_batik: "Batik Handcrafts",
            form_opt_canvas: "Canvas Painting",
            form_opt_jewellary: "Pendant & Jewelry Art",
            form_opt_line_art: "Mandala & Line Art",
            form_opt_handmade: "Coconut Shell Crafts",
            form_opt_project: "Wall Murals & Large Scale Projects",
            form_label_msg: "Review Notes / Inquiries",
            form_placeholder_msg: "Type your questions or panel evaluation notes here...",
            form_submit: "Send Message",
            form_success: "Thank you! Your message has been sent successfully. Avima Arts & Craft will get back to you shortly.",

            footer_tagline: "Structural line geometry, traditional temple motifs, and hand-painted wood designs.",
            footer_copy: "© 2026 Avima Arts & Craft. All rights reserved."
        },
        de: {
            nav_bio: "Biografie",
            nav_mystory: "Meine Geschichte",
            nav_qualifications: "Qualifikationen",
            nav_tools: "Studiowerkzeuge",
            nav_showcase: "Sammlungen",
            nav_inquire: "Anfragen",

            qual_tag: "Ausbildung & Qualifikationen",
            qual_h2: "QUALIFIKATIONEN",
            qual_subtitle: "Ein verifizierter operativer Werdegang auf Basis von Disziplin und Industriezertifizierung",
            qual_1_title: "G.C.E. Ordinary Level (O/L)",
            qual_1_inst: "Akademischer Abschluss — „B“-Bewertung im Bereich Bildende Kunst",
            qual_1_desc: "Grundlegende akademische Ausbildung in visueller Kunst, technischem Zeichnen und Kunstgeschichte.",
            qual_2_title: "G.C.E. Advanced Level (A/L)",
            qual_2_inst: "Geisteswissenschaftlicher Zweig — „B“-Bewertung in Bildender Kunst",
            qual_2_desc: "Fortgeschrittene Matura mit Schwerpunkt auf Kulturerbe, traditioneller südasiatischer Ästhetik und Komposition.",
            qual_3_title: "Professionelle Zertifizierung in Batikfärbung & Bekleidungsherstellung",
            qual_3_inst: "Sri Lanka Institute of Textile & Apparel (SLITA) — Technischer Campus",
            qual_3_desc: "Industrielle Spezialisierung auf Wachsreservetechnik, Farbchemie, Faserzusammensetzung und Bekleidungsproduktion.",
            qual_4_title: "Zertifikat für Mode-Design-Infrastruktur",
            qual_4_inst: "Singer Fashion Academy, Hauptsitz Sri Lanka",
            qual_4_desc: "Professionelles Diplom für Schnittmusterkonstruktion, Bekleidungsentwurf und Haute-Couture-Verarbeitung.",
            qual_5_title: "Fortgeschrittene Ausbildung — Saree-Jacket-Herstellungstechnologie",
            qual_5_inst: "Industrial Development Board of Ceylon (IDB) — Staatliches Exekutivprogramm",
            qual_5_desc: "Staatlich zertifizierte Schulung für ergonomische Passform, Konturenschneiderei und traditionelle Textilkonstruktion.",

            mystory_tag: "Künstlerische Philosophie & Vision",
            mystory_h2: "MEINE GESCHICHTE",
            mystory_core_1_title: "Holzkunst-Ingenieurwesen",
            mystory_core_1_desc: "Präzise Behandlung von Mahagoni- & Sperrholzplatten, freihändige Graphitstrukturen und mehrschichtige Schnitzreliefs.",
            mystory_core_2_title: "Schmuck-Designsysteme",
            mystory_core_2_desc: "Mikroboren, feine Metallkunst und handbemalte Miniatur-Accessoires, die strukturelle Geometrie mit tragbarer Kunst verbinden.",
            mystory_core_3_title: "Strukturelle Keramik",
            mystory_core_3_desc: "Architektonische Gipsmischungen, traditionelle sri-lankische Motive und fortschrittliche mehrstufige Keramikglasuren.",
            mystory_sub1_tag: "Künstlerischer Prozess",
            mystory_sub1_title: "Meine Künstlerische Entwicklung",
            mystory_sub1_p1: "Mein kreativer Prozess beginnt auf der physischen Ebene. Bei der Herstellung von Holzarbeiten wähle ich Mahagoniblöcke oder Sperrholzplatten von Hand aus und behandle sie sorgfältig, um Verzug zu vermeiden. Jedes Muster wird freihändig mit feinen Graphitstrukturen gezeichnet, bevor Werkzeuge oder Farben die Oberfläche berühren.",
            mystory_sub1_p2: "Für Mischtechnik-Arbeiten wie Textil- und Keramikkunst passe ich sri-lankische Kulturerbe-Muster mit moderner Methodik an. Jedes Werk erfordert präzises Schichten durch Mehrschicht-Lackierungen oder architektonische Gipsmischungen.",
            mystory_sub2_tag: "Philosophie",
            mystory_sub2_title: "Absichtserklärung",
            mystory_sub2_p1: "Kunst ist mehr als dekoratives Layout; sie ist strukturelle Kommunikation. Ich habe dieses Medium gewählt, weil haptische Objekte Geschichten über Grenzen hinweg erzählen.",
            mystory_quote_txt: "Mein langfristiges Ziel ist es, südasiatische Kunsthandwerkstraditionen mit deutschen Industrie- & Designprinzipien zu verbinden. Deutschland repräsentiert die Spitze struktureller Disziplin, historischer Bauhaus-Tradition und Materialinnovation.",
            mystory_quote_author: "Gründerin von Avima Arts and Craft",
            mystory_int_tag: "Internationales Ziel",
            mystory_int_title: "Strategische Ausrichtung an deutschen Kunstprinzipien",
            mystory_int_p: "Dieses Portfolio dient als Einstiegspunkt für europäische Validierung. Mit klarem Fokus auf Raumwahrnehmung, interdisziplinäre Materialforschung und nachhaltige Kunsthandwerkserhaltung demonstriert dieses Werk Einsatzbereitschaft für künstlerische Forschung in kontinentalen Ateliers und Akademien.",

            hero_role_1: "Handwerk",
            hero_role_2: "Bildende Kunst",
            hero_role_3: "Strukturdesign",
            hero_badge: "Prüfungskommission Bewertung",
            hero_tagline: "Kuratiere visuelle Harmonie durch traditionelle Muster, präzise Geometrie und organische Texturen.",
            hero_cta: "Portfolio Durchsuchen",

            about_tag: "Kandidatenprofil",
            about_h2_prefix: "Eine vielseitige Reise durch ",
            about_h2_muted: "visuelle Kunst & Handwerk...",
            about_role_1: "KREATIVER SCHÖPFER",
            about_role_2: "DESIGNER",
            about_role_3: "KÜNSTLER",
            about_text: "Angetrieben von einer lebenslangen Leidenschaft für Kunst und der Neugier, neue Medien zu erkunden, habe ich meine kreativen Ausdrücke bewusst über ein einzelnes Format hinaus erweitert. Von feiner Papier-Linienkunst über umweltfreundliches Holz- und Kokosnuss-Handwerk bis hin zu Stoffmalerei und großflächigen Wandgemälden betrachte ich jede Oberfläche als Leinwand. Hier ist ein kuratierter Überblick über meine bisherigen Meilensteine und laufenden künstlerischen Projekte.",
            about_focus: "Schwerpunkte",
            focus_1_title: "Linienkunst (Line Art)",
            focus_1_desc: "Präzise Ausführung aufwendiger Mandala-Designs, kontrastreicher Schwarz-Weiß-Linienkunst und traditioneller sri-lankischer Motive (wie Hansa und Liyawel) mit absoluter Symmetrie.",
            focus_2_title: "Strukturelle 3D & Reliefarbeiten",
            focus_2_desc: "Reliefkunst und dekorative Motive auf Beton-, Wand- und Holzoberflächen.",
            focus_3_title: "Stoff & Handgefertigte Objekte",
            focus_3_desc: "Handgemalte Stoffmuster, Kokosnussschalen-Handwerk und maßgeschneiderte Schmuckstücke.",

            tools_tag: "Einblick ins Atelier",
            tools_h2: "Materialien & Profi-Werkzeuge",
            tool_1_title: "🛠️ 01. Skizzier- & Formwerkzeuge",
            tool_1_pencils_label: "Bleistifte & Radiergummis: ",
            tool_1_pencils_txt: "Verwendet für die Vorzeichnung des Layouts und der Richtlinien direkt auf der Holzoberfläche.",
            tool_1_geo_label: "Geometrie-Set: ",
            tool_1_geo_txt: "Zirkel, Lineale und Winkelmesser zur exakten Messung kreisförmiger Formen und gleichmäßiger Abstände.",
            tool_1_dots_label: "Punktierwerkzeuge (Dotting Tools): ",
            tool_1_dots_txt: "Doppelendige Metallwerkzeuge in verschiedenen Größen für gleichmäßige Punkte und feine Details.",
            tool_1_palette_label: "Farbpaletten: ",
            tool_1_palette_txt: "Mischpaletten zum Anmischen individueller Farbtöne und Farbverläufe.",
            tool_2_title: "🖌️ 02. Pinsel-Kollektion",
            tool_2_bg_label: "Hintergrundpinsel (Flachpinsel): ",
            tool_2_bg_txt: "Breite Flachpinsel zum gleichmäßigen Auftragen der weißen Grundierung auf dem Mahagoni-Teller.",
            tool_2_fine_label: "Feindetailpinsel (00, 000, 0000): ",
            tool_2_fine_txt: "Hochpräzise, ultrafeine Pinsel für das freihändige Malen filigranster Ornamente.",
            tool_3_title: "🎨 03. Farben & Malmittel",
            tool_3_acrylic_label: "Acrylfarben: ",
            tool_3_acrylic_txt: "Hochwertige Acrylfarben für lebendige, strahlende Farbtöne (besonders Gelb-, Blau-, Schwarz- und Weißtöne).",
            tool_3_gesso_label: "Weißes Gesso / Grundierung: ",
            tool_3_gesso_txt: "Dicke weiße Grundierschicht, damit das Holz die Farbe gleichmäßig aufnimmt und die Farben leuchten.",
            tool_3_varnish_label: "Sprühfirnis / Schutzlack: ",
            tool_3_varnish_txt: "Klarer Schutzlack zum Versiegeln des fertigen Gemäldes gegen Staub, Feuchtigkeit und Kratzer.",

            gallery_tag: "Sammlungs-Präsentation",
            gallery_h2: "Alle Kreativen Werke",

            cat_tab_plate: "Teller & Mandalas",
            cat_tab_3d_cement: "3D Zementkunst",
            cat_tab_3d_wall: "3D Wanddekoration",
            cat_tab_canvas: "Leinwandkunst",
            cat_tab_jewellary: "Schmuck & Accessoires",
            cat_tab_project: "Projekte & Wandbilder",

            featured_badge: "✨ Hervorgehobenes Meisterwerk",
            view_artwork: "Kunstwerk Ansehen",
            watch_video: "▶ Video Ansehen",
            items_count_suffix: "Werke",

            contact_tag: "Kontakt Aufnehmen",
            contact_h2: "Bewertungskommission & Anfragen",
            contact_desc: "Bei Fragen zu Materialien, Aushärtungszeiten oder Techniken können Sie gerne eine Anfrage hinterlassen.",
            contact_label_name: "Kandidatenname",
            contact_label_email: "Allgemeiner Kontakt",
            form_label_name: "Ihr Name",
            form_placeholder_name: "Mitglied der Prüfungskommission",
            form_label_email: "Ihre E-Mail",
            form_placeholder_email: "gutachter@pruefungskommission.de",
            form_label_interest: "Interessiertes Kunstwerk",
            form_select_default: "Kategorie auswählen",
            form_opt_plate: "Mahagoni- & Keramik-Teller",
            form_opt_3d_cement: "3D Zementdekoration",
            form_opt_batik: "Batik-Kunsthandwerk",
            form_opt_canvas: "Leinwandmalerei",
            form_opt_jewellary: "Anhänger- & Schmuckkunst",
            form_opt_line_art: "Mandala- & Linienkunst",
            form_opt_handmade: "Kokosnussschalen-Handwerk",
            form_opt_project: "Wandbilder & Großprojekte",
            form_label_msg: "Bewertungsnotizen / Anfragen",
            form_placeholder_msg: "Geben Sie Ihre Fragen oder Notizen hier ein...",
            form_submit: "Nachricht Senden",
            form_success: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Avima Arts & Craft wird sich in Kürze bei Ihnen melden.",

            footer_tagline: "Strukturelle Liniengeometrie, traditionelle Tempelmotive und handbemalte Holzdesigns.",
            footer_copy: "© 2026 Avima Arts & Craft. Alle Rechte vorbehalten."
        }
    };

    // --- DOM Elements ---
    const siteHeader = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navLinksContainer = document.getElementById('nav-menu-links');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allCategoriesContainer = document.getElementById('all-categories-container');
    
    // Modal elements
    const artworkModal = document.getElementById('artwork-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalSubtag = document.getElementById('modal-subtag');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    // Contact form elements
    const contactForm = document.getElementById('contact-form');
    const formSpinner = document.getElementById('form-spinner');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('btn-submit-form');

    // Language switcher buttons
    const langBtnEn = document.getElementById('lang-btn-en');
    const langBtnDe = document.getElementById('lang-btn-de');

    // --- Category Configurations ---
    const categoriesConfig = [
        { key: 'plate', title: { en: 'Mahogany Plate Wall Decoration', de: 'Mahagoni-Holzteller Wanddekoration' }, icon: '🍽️', countTag: { en: 'Plates & Mandalas', de: 'Teller & Mandalas' } },
        { key: '3d-cement', title: { en: '3D Cement & Texture Relief Art', de: '3D Zement & Textur-Reliefkunst' }, icon: '🏺', countTag: { en: 'Cement Relief Sculptures', de: 'Zementrelief-Skulpturen' } },
        { key: '3d-wall', title: { en: '3D Wall Decoration Panels', de: '3D Wanddekoration Paneele' }, icon: '🖼️', countTag: { en: 'Floral Wall Panels', de: 'Blumen-Wandpaneele' } },
        { key: 'canvas', title: { en: 'Handcrafted Canvas Paintings', de: 'Handgefertigte Leinwandgemälde' }, icon: '🎨', countTag: { en: 'Canvas Masterpieces', de: 'Leinwand-Meisterwerke' } },
        { key: 'jewellary', title: { en: 'Handcrafted Butterfly & Floral Jewelry', de: 'Handgefertigter Schmetterlings- & Blumenschmuck' }, icon: '🦋', countTag: { en: 'Plywood Jewelry', de: 'Sperrholz-Schmuck' } },
        { key: 'project', title: { en: 'Projects, Murals & Line Art', de: 'Projekte, Wandbilder & Linienkunst' }, icon: '🏫', countTag: { en: 'Murals & Sketches', de: 'Wandbilder & Skizzen' } }
    ];

    // --- Multilingual Helper Functions ---
    function getItemTitle(item) {
        if (!item) return '';
        if (currentLang === 'de') {
            if (item.id === 'handcrafted-wooden-butterfly-jewelry') return 'Handgefertigter Holz-Schmetterlings- & Blumenschmuck – 8-Stufen Herstellungsprozess';
            if (item.id === 'mahogany-plate') return 'Mahagoni-Holzteller Wanddekoration – Handgefertigter Entstehungsprozess';
            if (item.id === '3d-cement-birds-flowers') return '3D Zement- & Textur-Reliefkunst – Bildhauerisches Meisterwerk';
            if (item.id === '3d-wall-collection-display') return '3D Wanddekoration Relief-Paneele Kollektion';
            if (item.id === 'canvas-elephant-family') return '"Die Liebe einer Elefantenfamilie" – Handgefertigtes Leinwand-Meisterwerk';
            if (item.id === 'sunburst-pendant') return 'Vielseitige Reise durch visuelle Kunst & Handwerkskunst';
            if (item.id === 'jewelry-unique-creations-full-wide') return 'Einzigartiger Handgefertigter Schmuck & Accessoires Showcase';
        }
        return item.title || '';
    }

    function getItemDesc(item) {
        if (!item) return '';
        if (currentLang === 'de') {
            if (item.id === 'handcrafted-wooden-butterfly-jewelry') return '🦋 Handgefertigter Holz-Schmetterlings- & Blumenschmuck – 8-Stufen Herstellungsprozess:\n\n• Aus einer rohen Sperrholzplatte geboren, erstrahlt die Pracht eines Schmetterlings in den lebendigen Farben der Natur...\n\nSchritt 01 (Materialauswahl): Auswahl hochwertiger Sperrholzplatten.\nSchritt 02 (Geometrisches Ausmessen): Präzises Messen (4,00 cm × 3,50 cm) & Vorzeichnen.\nSchritt 03 (Formenschnitt & Glättung): Werkzeugschnitt & Kanten-Schleifen mit Schleifpapier.\nSchritt 04 (Grundierung): Weiße Gesso-Grundierung für strahlende Farben.\nSchritt 05 (Freihand-Bemalung): Farbverläufe & Adern mit ultrafeinen Pinseln (00/000).\nSchritt 06 (Schutzlackierung): Schutzlack zum Schutz gegen Wasser & Kratzer.';
            if (item.id === 'mahogany-plate') return 'Mahagoni-Holzteller Wanddekoration – Schritt-für-Schritt Entstehung:\n\nSchritt 01: Mahagoni-Holzteller auswählen & weiß grundieren.\nSchritt 02: Konzentrische Leitlinien & Mandala-Muster zeichnen.\nSchritt 03: Feinmalerei mit Detailpinseln & Acrylfarben.\nSchritt 04: Klarer Schutzfirnis zum Versiegeln.';
            if (item.id === '3d-cement-birds-flowers') return '3D Zement- & Wandspachtel-Texturkunst – 4-Stufen Reliefprozess:\n\nStufe 01: Mischen von Zement & Spachtelmasse und Modellieren von Vogel- & Blumenformen.\nStufe 02: Erste Acryl-Farblasur.\nStufe 03: Vertiefen von Schatten für maximale Relief-Tiefe.\nStufe 04: Glanz-Firnis Versiegelung.';
            if (item.id === '3d-wall-collection-display') return '🖼️ 3D Wanddekoration Relief-Paneele Kollektion:\n\nHochrelief-Blumenpaneele aus Spezial-Modelliermasse mit goldenen Rahmenbordüren, darunter Lotusblumen, Orchideen, Sonnenblumen, Calla-Lilien, Tulpen und Kirschblüten.';
            if (item.id === 'canvas-elephant-family') return '🎨 Handgefertigte Leinwandkunst – Schritt-für-Schritt-Prozess & Werkzeugübersicht:\n\nElefantenfamilien-Porträt auf maßgefertigter Leinwand mit vielschichtigen Acryltönen und feinsten Pinselstrichen.';
            if (item.id === 'sunburst-pendant') return '🏫 Schul- & Außenprojekte, Kokosnuss-Handwerk & Linienkunst:\n\nKuratierte Übersicht über Wandgemälde, Linienzeichnungen auf Papier und Kokosnussschalen-Kunstwerke.';
        }
        return item.description || '';
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('malika_lang', lang);

        if (langBtnEn) langBtnEn.classList.toggle('active', lang === 'en');
        if (langBtnDe) langBtnDe.classList.toggle('active', lang === 'de');

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        renderAllCategories();
    }

    if (langBtnEn) langBtnEn.addEventListener('click', () => setLanguage('en'));
    if (langBtnDe) langBtnDe.addEventListener('click', () => setLanguage('de'));

    // --- Helper: Render Interactive Image Slider HTML ---
    function renderSliderHtml(images, title, uniqueId, isHero = false, customBg = null) {
        if (!images || images.length === 0) return '';
        if (images.length === 1) {
            const optSingleUrl = getOptimizedMediaUrl(images[0]);
            return `<img src="${optSingleUrl}" alt="${title}" class="${isHero ? 'featured-hero-img' : 'portfolio-img'}" loading="lazy" decoding="async">`;
        }

        const slidesHtml = images.map((imgSrc, idx) => {
            let bgVal = '#0f172a';
            if (Array.isArray(customBg)) {
                bgVal = customBg[idx % customBg.length] || '#0f172a';
            } else if (typeof customBg === 'string' && customBg) {
                bgVal = customBg;
            }
            const optSlideUrl = getOptimizedMediaUrl(imgSrc);
            return `
                <div class="slider-slide" style="background: ${bgVal};">
                    <img src="${optSlideUrl}" alt="${title} - Slide ${idx + 1}" loading="lazy" decoding="async" style="background: ${bgVal};">
                </div>
            `;
        }).join('');

        const dotsHtml = images.map((_, idx) => `
            <button class="slider-dot-btn ${idx === 0 ? 'active' : ''}" data-slider="${uniqueId}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
        `).join('');

        return `
            <div class="slider-wrapper" id="slider-${uniqueId}" data-current="0" data-total="${images.length}">
                <div class="slider-track" id="track-${uniqueId}">
                    ${slidesHtml}
                </div>
                <button class="slider-arrow prev" data-slider="${uniqueId}" data-dir="-1" aria-label="Previous slide">❮</button>
                <button class="slider-arrow next" data-slider="${uniqueId}" data-dir="1" aria-label="Next slide">❯</button>
                <div class="slider-dots-container">
                    ${dotsHtml}
                </div>
                <span class="slider-counter-badge" id="counter-${uniqueId}">1 / ${images.length}</span>
            </div>
        `;
    }

    // --- Helper: Slider Controller Event Setup ---
    function setupSliders() {
        document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
            const sliderId = wrapper.id.replace('slider-', '');
            const track = document.getElementById(`track-${sliderId}`);
            const counter = document.getElementById(`counter-${sliderId}`);
            const dots = wrapper.querySelectorAll('.slider-dot-btn');
            const prevBtn = wrapper.querySelector('.slider-arrow.prev');
            const nextBtn = wrapper.querySelector('.slider-arrow.next');
            const total = parseInt(wrapper.getAttribute('data-total'), 10);

            let currentIndex = 0;

            const updateSlider = (index) => {
                currentIndex = (index + total) % total;
                wrapper.setAttribute('data-current', currentIndex);
                if (track) {
                    track.style.transform = `translateX(-${currentIndex * 100}%)`;
                    // Dynamically update parent portfolio-img-container background color
                    const currentSlide = track.children[currentIndex];
                    if (currentSlide && currentSlide.style.backgroundColor) {
                        const parentContainer = wrapper.closest('.portfolio-img-container');
                        if (parentContainer) {
                            parentContainer.style.backgroundColor = currentSlide.style.backgroundColor;
                        }
                    }
                }
                if (counter) {
                    counter.textContent = `${currentIndex + 1} / ${total}`;
                }
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentIndex);
                });
            };

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateSlider(currentIndex - 1);
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateSlider(currentIndex + 1);
                });
            }

            dots.forEach((dot) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(dot.getAttribute('data-index'), 10);
                    updateSlider(idx);
                });
            });

            // Touch Swipe Support for Mobile
            let startX = 0;
            wrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            wrapper.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) updateSlider(currentIndex + 1);
                    else updateSlider(currentIndex - 1);
                }
            }, { passive: true });

            // Automatic Playback (cycles every 4 seconds, pauses on hover)
            let autoplayTimer = setInterval(() => {
                updateSlider(currentIndex + 1);
            }, 4000);

            wrapper.addEventListener('mouseenter', () => {
                clearInterval(autoplayTimer);
            });

            wrapper.addEventListener('mouseleave', () => {
                clearInterval(autoplayTimer);
                autoplayTimer = setInterval(() => {
                    updateSlider(currentIndex + 1);
                }, 4000);
            });
        });
    }

    // --- Render All Categories (Featured Hero Showcase + Remaining Grid) ---
    function renderAllCategories() {
        if (!allCategoriesContainer) return;
        allCategoriesContainer.innerHTML = '';

        categoriesConfig.forEach(cat => {
            const catItems = artworkItems.filter(item => {
                if (Array.isArray(item.filter)) return item.filter.includes(cat.key);
                return item.filter === cat.key;
            });

            if (catItems.length === 0) return;

            // 1st Item becomes the Featured Showcase Header
            const featuredItem = catItems[0];
            // Remaining items form the lower gallery grid (NO duplication!)
            const remainingItems = catItems.slice(1);

            const section = document.createElement('section');
            section.className = 'category-block-section';
            section.id = `category-${cat.key}`;

            const catTitleStr = typeof cat.title === 'object' ? (cat.title[currentLang] || cat.title.en) : cat.title;
            const itemsSuffix = translations[currentLang].items_count_suffix;
            const featBadge = translations[currentLang].featured_badge;
            const viewTxt = translations[currentLang].view_artwork;
            const watchTxt = translations[currentLang].watch_video;

            // Header Banner
            const headerHtml = `
                <div class="category-header-banner">
                    <div class="category-title-group">
                        <div class="category-icon-badge">${cat.icon}</div>
                        <h3 class="category-block-title">${catTitleStr}</h3>
                    </div>
                    <span class="category-item-count">${catItems.length} ${itemsSuffix}</span>
                </div>
            `;

            // Featured Hero Showcase Media
            let featuredMediaHtml = '';
            const featImages = featuredItem.images || (featuredItem.image ? [featuredItem.image] : []);
            const featTitle = getItemTitle(featuredItem);
            const featDesc = getItemDesc(featuredItem) || 'Handcrafted artwork featuring intricate detailing and high-quality materials.';

            if (featuredItem.video) {
                featuredMediaHtml = `
                    <div class="featured-hero-media" style="border-radius: 12px; overflow: hidden; background: #000;">
                        <video src="${featuredItem.video}" style="width: 100%; height: 100%; object-fit: contain; padding: 8px; box-sizing: border-box; background: #0b0e14;" autoplay loop muted playsinline controls preload="metadata"></video>
                    </div>
                `;
            } else {
                featuredMediaHtml = `
                    <div class="featured-hero-media">
                        ${renderSliderHtml(featImages, featTitle, `hero-${featuredItem.id}`, true)}
                    </div>
                `;
            }

            // Featured Hero Showcase Info Block (ALWAYS VISIBLE DESCRIPTION)
            const featuredInfoHtml = `
                <div class="featured-hero-info">
                    <div class="featured-badge">${featBadge}</div>
                    <h3 class="featured-title">${featTitle}</h3>
                    <p class="featured-desc-text">${featDesc}</p>
                </div>
            `;

            const featuredHeroCardHtml = `
                <div class="featured-hero-card">
                    ${featuredMediaHtml}
                    ${featuredInfoHtml}
                </div>
            `;

            // Remaining Gallery Grid (Sub-categorized for Projects)
            let gridHtml = '';
            if (remainingItems.length > 0) {
                if (cat.key === 'project') {
                    // Group Projects items by sub-category
                    const subGroups = {};
                    remainingItems.forEach(item => {
                        const subCat = item.category || 'Other Works';
                        if (!subGroups[subCat]) subGroups[subCat] = [];
                        subGroups[subCat].push(item);
                    });

                    Object.keys(subGroups).forEach(subCatName => {
                        let subCardsHtml = '';
                        subGroups[subCatName].forEach(item => {
                            const itemImages = item.images || (item.image ? [item.image] : []);
                            const itemTitle = getItemTitle(item);
                            let cardMediaHtml = '';

                            if (item.video) {
                                cardMediaHtml = `
                                    <div class="portfolio-img-container" style="background: #0f172a; position: relative; overflow: hidden; border-radius: 12px; cursor: pointer;">
                                        <video src="${item.video}" class="portfolio-img" style="width: 100%; height: 100%; object-fit: contain; padding: 6px; box-sizing: border-box; background: #0f172a;" autoplay loop muted playsinline preload="metadata"></video>
                                        <div class="portfolio-overlay">
                                            <span class="view-details-txt">${watchTxt}</span>
                                        </div>
                                    </div>
                                `;
                            } else if (itemImages.length > 1) {
                                const bgs = item.slideBgs || item.bgColor || null;
                                const initBg = Array.isArray(bgs) ? bgs[0] : (bgs || '#0f172a');
                                cardMediaHtml = `
                                    <div class="portfolio-img-container" style="background: ${initBg}; transition: background 0.45s ease;">
                                        ${renderSliderHtml(itemImages, itemTitle, `grid-${item.id}`, false, bgs)}
                                    </div>
                                `;
                            } else {
                                cardMediaHtml = `
                                    <div class="portfolio-img-container">
                                        <img src="${item.image}" alt="${itemTitle}" class="portfolio-img" loading="lazy">
                                        <div class="portfolio-overlay">
                                            <span class="view-details-txt">${viewTxt}</span>
                                        </div>
                                    </div>
                                `;
                            }

                            subCardsHtml += `
                                <div class="portfolio-card" data-id="${item.id}" id="card-${item.id}">
                                    ${cardMediaHtml}
                                    <div class="portfolio-info">
                                        <span class="portfolio-item-category">${item.category}</span>
                                        <h3 class="portfolio-item-title">${itemTitle}</h3>
                                    </div>
                                </div>
                            `;
                        });

                        gridHtml += `
                            <div class="subcategory-group-block" style="margin-top: 2.5rem; margin-bottom: 1.5rem;">
                                <div class="subcategory-banner" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(79, 107, 255, 0.2);">
                                    <span style="font-size: 1.1rem; font-weight: 700; color: var(--accent); letter-spacing: 0.05em; text-transform: uppercase;">• ${subCatName}</span>
                                    <span style="font-size: 0.8rem; color: var(--muted); font-weight: 500;">(${subGroups[subCatName].length} ${itemsSuffix})</span>
                                </div>
                                <div class="portfolio-grid">
                                    ${subCardsHtml}
                                </div>
                            </div>
                        `;
                    });
                } else {
                    let gridCardsHtml = '';
                    remainingItems.forEach(item => {
                        const itemImages = item.images || (item.image ? [item.image] : []);
                        const itemTitle = getItemTitle(item);
                        let cardMediaHtml = '';

                        if (item.video) {
                            cardMediaHtml = `
                                <div class="portfolio-img-container" style="background: #0f172a; position: relative; overflow: hidden; border-radius: 12px; cursor: pointer;">
                                    <video src="${item.video}" class="portfolio-img" style="width: 100%; height: 100%; object-fit: contain; padding: 6px; box-sizing: border-box; background: #0f172a;" autoplay loop muted playsinline preload="metadata"></video>
                                    <div class="portfolio-overlay">
                                        <span class="view-details-txt">${watchTxt}</span>
                                    </div>
                                </div>
                            `;
                        } else if (itemImages.length > 1) {
                            const bgs = item.slideBgs || item.bgColor || null;
                            const initBg = Array.isArray(bgs) ? bgs[0] : (bgs || '#0f172a');
                            cardMediaHtml = `
                                <div class="portfolio-img-container" style="background: ${initBg}; transition: background 0.45s ease;">
                                    ${renderSliderHtml(itemImages, itemTitle, `grid-${item.id}`, false, bgs)}
                                </div>
                            `;
                        } else {
                            cardMediaHtml = `
                                <div class="portfolio-img-container">
                                    <img src="${item.image}" alt="${itemTitle}" class="portfolio-img" loading="lazy">
                                    <div class="portfolio-overlay">
                                        <span class="view-details-txt">${viewTxt}</span>
                                    </div>
                                </div>
                            `;
                        }

                        gridCardsHtml += `
                            <div class="portfolio-card" data-id="${item.id}" id="card-${item.id}">
                                ${cardMediaHtml}
                                <div class="portfolio-info">
                                    <span class="portfolio-item-category">${item.category}</span>
                                    <h3 class="portfolio-item-title">${itemTitle}</h3>
                                </div>
                            </div>
                        `;
                    });

                    gridHtml = `
                        <div class="portfolio-grid">
                            ${gridCardsHtml}
                        </div>
                    `;
                }
            }

            section.innerHTML = `
                ${headerHtml}
                ${featuredHeroCardHtml}
                ${gridHtml}
            `;

            allCategoriesContainer.appendChild(section);
        });

        setupSliders();
        setupScrollSpy();
        setupCardClicks();
    }

    // --- ScrollSpy & Sticky Tab Controller ---
    function setupScrollSpy() {
        const sections = document.querySelectorAll('.category-block-section');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const filterContainer = document.getElementById('filter-controls');
        if (!sections.length || !filterBtns.length) return;

        let isManualClick = false;

        const updateActiveCategoryOnScroll = () => {
            if (isManualClick) return;

            let currentActiveId = '';
            const viewportThreshold = 220;

            sections.forEach(sec => {
                const rect = sec.getBoundingClientRect();
                if (rect.top <= viewportThreshold && rect.bottom >= 120) {
                    currentActiveId = sec.id.replace('category-', '');
                }
            });

            // If user is above the gallery section (Bio, My Story, Qualifications, Studio Tools, Hero), clear category lock!
            const galleryElem = document.getElementById('gallery');
            if (galleryElem) {
                const galRect = galleryElem.getBoundingClientRect();
                if (galRect.top > viewportThreshold) {
                    currentActiveId = '';
                }
            }

            filterBtns.forEach(btn => {
                const isActive = Boolean(currentActiveId && btn.getAttribute('data-filter') === currentActiveId);
                btn.classList.toggle('active', isActive);

                if (isActive && filterContainer) {
                    const btnLeft = btn.offsetLeft;
                    const btnWidth = btn.offsetWidth;
                    const containerWidth = filterContainer.offsetWidth;
                    filterContainer.scrollTo({
                        left: btnLeft - containerWidth / 2 + btnWidth / 2,
                        behavior: 'smooth'
                    });
                }
            });
        };

        window.addEventListener('scroll', updateActiveCategoryOnScroll, { passive: true });
        updateActiveCategoryOnScroll();

        filterBtns.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                const targetSection = document.getElementById(`category-${filterValue}`);

                isManualClick = true;
                filterBtns.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (filterContainer) {
                    const btnLeft = button.offsetLeft;
                    const btnWidth = button.offsetWidth;
                    const containerWidth = filterContainer.offsetWidth;
                    filterContainer.scrollTo({
                        left: btnLeft - containerWidth / 2 + btnWidth / 2,
                        behavior: 'smooth'
                    });
                }

                if (targetSection) {
                    const headerOffset = 130;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }

                setTimeout(() => {
                    isManualClick = false;
                }, 800);
            });
        });
    }

    // --- Mobile Menu Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // --- Main Site Header ScrollSpy & Navigation Controller ---
    function setupMainHeaderScrollSpy() {
        const mainSections = [
            { id: 'about' },
            { id: 'mystory' },
            { id: 'qualifications' },
            { id: 'tools' },
            { id: 'gallery' },
            { id: 'contact' }
        ];

        const headerNavLinks = document.querySelectorAll('.nav-menu .nav-link');

        const updateMainHeaderNavOnScroll = () => {
            let activeId = '';
            const headerOffsetThreshold = 180;

            mainSections.forEach(secInfo => {
                const elem = document.getElementById(secInfo.id);
                if (elem) {
                    const rect = elem.getBoundingClientRect();
                    if (rect.top <= headerOffsetThreshold && rect.bottom >= 100) {
                        activeId = secInfo.id;
                    }
                }
            });

            headerNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (activeId && href === `#${activeId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        window.addEventListener('scroll', updateMainHeaderNavOnScroll, { passive: true });
        updateMainHeaderNavOnScroll();
    }

    setupMainHeaderScrollSpy();

    // --- Smooth Scroll Navigation for Section Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();

                if (menuToggle) {
                    menuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                }

                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }

                const headerOffset = 75;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle initial hash on page load
    if (window.location.hash) {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
            setTimeout(() => {
                const headerOffset = 75;
                const elementPosition = initialTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });

    // --- Lightbox Modal Logic with Multi-Image Slider & Touch Swipe ---
    let currentModalItem = null;
    let currentModalImageIndex = 0;

    const updateModalImage = () => {
        if (!currentModalItem) return;

        const modalImagePane = artworkModal.querySelector('.modal-image-pane');
        if (!modalImagePane) return;

        const imagesList = (currentModalItem.images && currentModalItem.images.length > 0)
            ? currentModalItem.images
            : [currentModalItem.image];

        const totalImages = imagesList.length;
        currentModalImageIndex = (currentModalImageIndex + totalImages) % totalImages;
        const rawSrc = imagesList[currentModalImageIndex];
        const currentSrc = getOptimizedMediaUrl ? getOptimizedMediaUrl(rawSrc) : rawSrc;
        const itemTitle = getItemTitle(currentModalItem);

        if (currentModalItem.video) {
            modalImagePane.innerHTML = `
                <video src="${currentModalItem.video}" controls autoplay muted playsinline style="max-width: 95vw; max-height: 65vh; object-fit: contain; border-radius: 12px; border: 2px solid rgba(255, 255, 255, 0.25); box-shadow: 0 10px 30px rgba(0,0,0,0.6); background: #000; display: block;"></video>
            `;
        } else {
            let navHtml = '';
            if (totalImages > 1) {
                navHtml = `
                    <button class="modal-nav-arrow prev" id="modal-nav-prev" aria-label="Previous image">❮</button>
                    <button class="modal-nav-arrow next" id="modal-nav-next" aria-label="Next image">❯</button>
                    <span class="modal-counter">${currentModalImageIndex + 1} / ${totalImages}</span>
                `;
            }
            modalImagePane.innerHTML = `
                <img id="modal-img" src="${currentSrc}" alt="${itemTitle} - view ${currentModalImageIndex + 1}" class="modal-image loaded" style="object-fit: contain !important;">
                ${navHtml}
            `;

            // Attach Arrow Click Listeners
            const prevBtn = modalImagePane.querySelector('#modal-nav-prev');
            const nextBtn = modalImagePane.querySelector('#modal-nav-next');
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentModalImageIndex--;
                    updateModalImage();
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentModalImageIndex++;
                    updateModalImage();
                });
            }

            // Touch Swipe Support for Lightbox
            let touchStartX = 0;
            modalImagePane.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            modalImagePane.addEventListener('touchend', (e) => {
                if (totalImages <= 1) return;
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        currentModalImageIndex++;
                    } else {
                        currentModalImageIndex--;
                    }
                    updateModalImage();
                }
            }, { passive: true });
        }
    };

    const openModal = (itemId) => {
        const item = artworkItems.find(i => i.id === itemId);
        if (!item) return;

        currentModalItem = item;
        currentModalImageIndex = 0;

        const itemTitle = getItemTitle(item);
        const itemDesc = getItemDesc(item);

        updateModalImage();

        modalTitle.textContent = itemTitle;

        if (modalSubtag) {
            modalSubtag.textContent = item.category || '';
            modalSubtag.style.display = item.category ? 'inline-block' : 'none';
        }

        if (modalDesc) {
            modalDesc.textContent = itemDesc || '';
            modalDesc.style.display = itemDesc ? 'block' : 'none';
        }

        artworkModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        artworkModal.classList.remove('active');
        document.body.style.overflow = '';
        currentModalItem = null;
        currentModalImageIndex = 0;
        const modalImagePane = artworkModal.querySelector('.modal-image-pane');
        if (modalImagePane) {
            modalImagePane.innerHTML = '<img id="modal-img" src="" alt="artwork detail modal" class="modal-image">';
        }
    };

    function setupCardClicks() {
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // If user clicked slider arrows or dots, don't trigger modal
                if (e.target.closest('.slider-arrow') || e.target.closest('.slider-dot-btn')) {
                    return;
                }
                const itemId = card.getAttribute('data-id');
                openModal(itemId);
            });
        });
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (!artworkModal.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft' && currentModalItem) {
            currentModalImageIndex--;
            updateModalImage();
        } else if (e.key === 'ArrowRight' && currentModalItem) {
            currentModalImageIndex++;
            updateModalImage();
        }
    });

    // --- Contact Form Submission Handler ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (formSpinner) formSpinner.style.display = 'inline-block';
            if (submitBtn) submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                interest: formData.get('interest'),
                message: formData.get('message'),
                _subject: 'New Portfolio Inquiry - ' + (formData.get('name') || 'Visitor')
            };

            fetch('https://formsubmit.co/ajax/jeewanthmalika@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (formSpinner) formSpinner.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
                if (formFeedback) {
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = translations[currentLang].form_success;
                    formFeedback.style.display = 'block';
                }
                contactForm.reset();
                setTimeout(() => {
                    if (formFeedback) formFeedback.style.display = 'none';
                }, 6000);
            })
            .catch(error => {
                if (formSpinner) formSpinner.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
                if (formFeedback) {
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = translations[currentLang].form_success;
                    formFeedback.style.display = 'block';
                }
                contactForm.reset();
            });
        });
    }

    // Initialize Language & All Categories Showcase
    setLanguage(currentLang);
});
