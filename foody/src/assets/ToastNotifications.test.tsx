import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToastNotifications from './ToastNotifications'; // Adjust the path as needed
import '@testing-library/jest-dom';

describe('ToastNotifications', () => {

  it('renders success icon and message', () => {
    render(<ToastNotifications icon="success" message="Product created successfully!" />);
    
    // Check if the success icon is displayed
    const successIcon = screen.getByTestId('success-icon'); // Expect the icon to be an SVG
    expect(successIcon).toBeInTheDocument();

    // Check if the message is displayed
    const message = screen.getByText('Product created successfully!');
    expect(message).toBeInTheDocument();
  });

  it('renders error icon and message', () => {
    render(<ToastNotifications icon="error" message="Failed to create product!" />);
    
    // Check if the error icon is displayed
    const errorIcon = screen.getByTestId('error-icon'); // Expect the icon to be an SVG
    expect(errorIcon).toBeInTheDocument();

    // Check if the message is displayed
    const message = screen.getByText('Failed to create product!');
    expect(message).toBeInTheDocument();
  });

  it('should automatically fade out after the duration', async () => {
    render(<ToastNotifications icon="success" message="Toast will fade!" duration={3000} />);
    
    // Initially, the toast should be visible
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();

    // Wait for the duration to pass, the fade effect should be triggered
    await waitFor(() => {
      expect(toast).toHaveClass('opacity-0'); // Check if the fade-out class is applied
    }, { timeout: 3500 }); // Allow for the fade effect to complete

    // After the fade, the toast should no longer be in the document
    await waitFor(() => {
      expect(toast).not.toBeInTheDocument();
    }, { timeout: 5500 });
  });

  it('should allow the user to manually close the toast', async () => {
    render(<ToastNotifications icon="error" message="This will close!" />);
    
    // Check if the toast is initially visible
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();

    // Click the close button
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // Wait for the fade-out effect
    await waitFor(() => {
      expect(toast).not.toBeInTheDocument(); // Ensure the toast is no longer in the document
    });
  });

  it('should display the toast for the correct duration when the duration prop is passed', async () => {
    render(<ToastNotifications icon="success" message="This will last 4 seconds!" duration={4000} />);
    
    // Initially, the toast should be visible
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();

    // Wait for 4 seconds, then check if it's removed
    await waitFor(() => {
      expect(toast).not.toBeInTheDocument();
    }, { timeout: 4500 }); // Allow for any timing delays
  });
  
});

