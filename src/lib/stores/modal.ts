import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

export interface ModalConfig {
	id: string;
	title?: string;
	content?: string;
	component?: ComponentType;
	componentProps?: Record<string, unknown>;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	variant?: 'default' | 'danger' | 'success' | 'warning';
	showCloseButton?: boolean;
	closeOnBackdrop?: boolean;
	closeOnEscape?: boolean;
	persistent?: boolean;
	customActions?: Array<{
		label: string;
		action: () => void;
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
		disabled?: boolean;
	}>;
	onClose?: () => void;
	onOpen?: () => void;
}

interface ModalState {
	isOpen: boolean;
	config: ModalConfig | null;
}

const initialState: ModalState = {
	isOpen: false,
	config: null
};

export const modalStore = writable<ModalState>(initialState);

// Helper functions for easier modal control
export const modal = {
	open: (config: Omit<ModalConfig, 'id'> & { id?: string }) => {
		const modalConfig: ModalConfig = {
			id: config.id || Date.now().toString(),
			size: 'md',
			variant: 'default',
			showCloseButton: true,
			closeOnBackdrop: true,
			closeOnEscape: true,
			persistent: false,
			...config
		};

		modalStore.set({
			isOpen: true,
			config: modalConfig
		});

		// Call onOpen callback if provided
		if (modalConfig.onOpen) {
			modalConfig.onOpen();
		}
	},

	close: () => {
		modalStore.update((state) => {
			// Call onClose callback if provided
			if (state.config?.onClose) {
				state.config.onClose();
			}
			return {
				isOpen: false,
				config: null
			};
		});
	},

	// Quick helper functions for common modal types
	alert: (title: string, content: string, onClose?: () => void) => {
		modal.open({
			title,
			content,
			size: 'sm',
			closeOnBackdrop: false,
			customActions: [
				{
					label: 'OK',
					action: () => {
						modal.close();
						if (onClose) onClose();
					},
					variant: 'primary'
				}
			],
			onClose
		});
	},

	confirm: (title: string, content: string, onConfirm: () => void, onCancel?: () => void) => {
		modal.open({
			title,
			content,
			size: 'sm',
			variant: 'danger',
			closeOnBackdrop: false,
			customActions: [
				{
					label: 'Cancel',
					action: () => {
						modal.close();
						if (onCancel) onCancel();
					},
					variant: 'outline'
				},
				{
					label: 'Confirm',
					action: () => {
						modal.close();
						onConfirm();
					},
					variant: 'primary'
				}
			]
			// Removed onClose: onCancel to prevent cancel callback when confirming
		});
	},

	success: (title: string, content: string, onClose?: () => void) => {
		modal.open({
			title,
			content,
			size: 'sm',
			variant: 'success',
			customActions: [
				{
					label: 'OK',
					action: () => {
						modal.close();
						if (onClose) onClose();
					},
					variant: 'primary'
				}
			],
			onClose
		});
	}
};
